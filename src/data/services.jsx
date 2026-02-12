import React from 'react';
import { Code, Image as ImageIcon, Video, Box, Cpu, Palette } from 'lucide-react';
import videoEditingImg from '../assets/images/video-editing-v2.png';
import automationBg from '../assets/images/automation-bg.jpg';
import newAesthetic from '../assets/images/new-aesthetic.jpg';

export const servicesData = [
    {
        icon: <Code className="w-8 h-8 text-blue-200" />,
        title: "AI Website Generation",
        subItems: ["What We Deliver", "Our Process", "Use Cases", "Turnaround Time", "Tools & Tech"],
        backgroundImage: newAesthetic
    },
    {
        icon: <ImageIcon className="w-8 h-8 text-pink-200" />,
        title: "Custom Image Gen",
        subItems: ["What We Offer", "Specialties", "Turnaround"]
    },
    {
        icon: <Video className="w-8 h-8 text-purple-200" />,
        title: "Video Editing",
        subItems: ["Services", "Video Types", "AI Features"],
        backgroundImage: videoEditingImg
    },
    {
        icon: <Cpu className="w-8 h-8 text-green-200" />,
        title: "AI Automation",
        subItems: ["Solutions", "Real Examples", "Use Cases"]
    },
    {
        icon: <Box className="w-8 h-8 text-yellow-200" />,
        title: "Brand Campaigns",
        subItems: ["Whats Included", "Categories", "Pricing Model"]
    },
    {
        icon: <Palette className="w-8 h-8 text-orange-200" />,
        title: "UI/UX Design",
        subItems: ["Design Systems", "Prototyping", "User Research"]
    }
];
