import { PrismaClient } from '@prisma/client';
import AppError from '../utils/AppError.js';

const prisma = new PrismaClient();

export const getAllProjects = async (req, res, next) => {
    try {
        const rawProjects = await prisma.project.findMany({
            where: { userId: req.user.id },
            orderBy: { updatedAt: 'desc' }
        });

        const projects = rawProjects.map(p => ({
            ...p,
            techStack: p.techStack ? JSON.parse(p.techStack) : []
        }));

        res.status(200).json({
            status: 'success',
            results: projects.length,
            data: {
                projects
            }
        });
    } catch (err) {
        next(err);
    }
};

export const createProject = async (req, res, next) => {
    try {
        const { title, description, status, deploymentUrl, repoUrl, techStack } = req.body;

        const newProject = await prisma.project.create({
            data: {
                title,
                description,
                status,
                deploymentUrl,
                repoUrl,
                techStack: JSON.stringify(techStack || []),
                userId: req.user.id
            }
        });

        // Parse techStack back for response
        newProject.techStack = JSON.parse(newProject.techStack);

        // Audit Log
        await prisma.auditLog.create({
            data: {
                action: 'PROJECT_CREATED',
                resource: 'Project',
                resourceId: newProject.id,
                details: JSON.stringify({ title: newProject.title }),
                userId: req.user.id
            }
        });

        res.status(201).json({
            status: 'success',
            data: {
                project: newProject
            }
        });
    } catch (err) {
        next(err);
    }
};

export const getProject = async (req, res, next) => {
    try {
        let project = await prisma.project.findUnique({
            where: { id: req.params.id }
        });

        if (!project) {
            return next(new AppError('No project found with that ID', 404));
        }

        // Security check: Only owner or admin can access
        if (project.userId !== req.user.id && req.user.role !== 'ADMIN') {
            return next(new AppError('You do not have permission to access this project', 403));
        }

        res.status(200).json({
            status: 'success',
            data: {
                project: {
                    ...project,
                    techStack: project.techStack ? JSON.parse(project.techStack) : []
                }
            }
        });
    } catch (err) {
        next(err);
    }
};

export const updateProject = async (req, res, next) => {
    try {
        const project = await prisma.project.findUnique({
            where: { id: req.params.id }
        });

        if (!project) {
            return next(new AppError('No project found with that ID', 404));
        }

        if (project.userId !== req.user.id && req.user.role !== 'ADMIN') {
            return next(new AppError('You do not have permission to update this project', 403));
        }

        const dataToUpdate = { ...req.body };
        if (dataToUpdate.techStack) {
            dataToUpdate.techStack = JSON.stringify(dataToUpdate.techStack);
        }

        let updatedProject = await prisma.project.update({
            where: { id: req.params.id },
            data: dataToUpdate
        });

        updatedProject.techStack = updatedProject.techStack ? JSON.parse(updatedProject.techStack) : [];

        // Audit Log
        await prisma.auditLog.create({
            data: {
                action: 'PROJECT_UPDATED',
                resource: 'Project',
                resourceId: updatedProject.id,
                details: JSON.stringify({ changes: Object.keys(req.body) }),
                userId: req.user.id
            }
        });

        res.status(200).json({
            status: 'success',
            data: {
                project: updatedProject
            }
        });
    } catch (err) {
        next(err);
    }
};

export const deleteProject = async (req, res, next) => {
    try {
        const project = await prisma.project.findUnique({
            where: { id: req.params.id }
        });

        if (!project) {
            return next(new AppError('No project found with that ID', 404));
        }

        if (project.userId !== req.user.id && req.user.role !== 'ADMIN') {
            return next(new AppError('You do not have permission to delete this project', 403));
        }

        await prisma.project.delete({
            where: { id: req.params.id }
        });

        // Audit Log
        await prisma.auditLog.create({
            data: {
                action: 'PROJECT_DELETED',
                resource: 'Project',
                resourceId: req.params.id,
                details: JSON.stringify({ title: project.title }),
                userId: req.user.id
            }
        });

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        next(err);
    }
};
