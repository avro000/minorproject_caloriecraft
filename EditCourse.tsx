import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Video {
    title: string;
    description: string;
    url: string;
}

interface Subtopic {
    name: string;
    videos: Video[];
}

interface Topic {
    name: string;
    subtopics: Subtopic[];
}

interface StudyMaterial {
    name: string;
    fileName: string;
    fileUrl: string;
    downloadUrl: string;
}

interface CourseOptions {
    benefits: string;
    prerequisites: string;
}

interface Course {
    courseId: number;
    title: string;
    description: string;
    price: number;
    category: string;
    instructorEmail: string;
    thumbnailUrl: string;
    level: string;
    language: string;
    topics: Topic[];
    courseOptions: CourseOptions;
    studyMaterials: StudyMaterial[];
}

interface EditCourseProps {
    course: Course;
    onCancel: () => void;
}

const EditCourse: React.FC<EditCourseProps> = ({ course, onCancel }) => {
    const [formData, setFormData] = useState<Course>(course);

    // Helper function to handle changes in nested data
    const handleChange = (e: React.ChangeEvent<HTMLElement>, path: string) => {
        const value = (e.target as HTMLInputElement).value; // Cast the event target
        const keys = path.split(".");
        let updatedData = { ...formData };

        // Check if the value is supposed to be numeric
        const lastKey = keys.pop()!;
        const lastObj = keys.reduce((acc: any, key: string) => acc[key], updatedData);

        // Convert price to a number if it's numeric
        if (lastKey === 'price') {
            lastObj[lastKey] = value ? parseFloat(value) : 0;
        } else {
            lastObj[lastKey] = value;
        }

        setFormData(updatedData);
    };

    const handleTopicChange = (e: React.ChangeEvent<HTMLElement>, topicIndex: number, subtopicIndex: number, path: keyof Subtopic) => {
        const value = (e.target as HTMLInputElement).value; // Ensure this is a string
        let updatedData = { ...formData };

        // Handle path-based changes
        if (path === "name") {
            // This should be a string
            updatedData.topics[topicIndex].subtopics[subtopicIndex].name = value;
        } else if (path === "videos") {
            // If path is 'videos', handle the array of videos differently
            const newVideo: Video = { title: "", description: "", url: "" }; // Default new video structure
            updatedData.topics[topicIndex].subtopics[subtopicIndex].videos = [...updatedData.topics[topicIndex].subtopics[subtopicIndex].videos, newVideo];
        }

        setFormData(updatedData);
    };


    const handleVideoChange = (e: React.ChangeEvent<HTMLElement>, topicIndex: number, subtopicIndex: number, videoIndex: number, path: keyof Video) => {
        const value = (e.target as HTMLInputElement).value; // Ensure this is a string
        let updatedData = { ...formData };

        updatedData.topics[topicIndex].subtopics[subtopicIndex].videos[videoIndex][path] = value;
        setFormData(updatedData);
    };

    const handleStudyMaterialChange = (e: React.ChangeEvent<HTMLElement>, index: number, path: keyof StudyMaterial) => {
        const value = (e.target as HTMLInputElement).value; // Ensure this is a string
        let updatedData = { ...formData };

        updatedData.studyMaterials[index][path] = value;
        setFormData(updatedData);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted", formData);
        // You can add your API request logic here to update the course
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Editing: {course.title}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Course Details</CardTitle>
                        <CardDescription>Update course details below:</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col gap-4">
                            <Label htmlFor="title">Course Title</Label>
                            <Input
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={(e) => handleChange(e, "title")}
                                placeholder="Enter course title"
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <Label htmlFor="description">Course Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={(e) => handleChange(e, "description")}
                                placeholder="Enter course description"
                                rows={4}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <Label htmlFor="price">Price</Label>
                            <Input
                                id="price"
                                name="price"
                                value={formData.price.toString()}
                                onChange={(e) => handleChange(e, "price")}
                                type="number"
                                placeholder="Enter course price"
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <Label htmlFor="category">Category</Label>
                            <Input
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={(e) => handleChange(e, "category")}
                                placeholder="Enter course category"
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <Label htmlFor="level">Level</Label>
                            <Input
                                id="level"
                                name="level"
                                value={formData.level}
                                onChange={(e) => handleChange(e, "level")}
                                placeholder="Enter course level"
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <Label htmlFor="language">Language</Label>
                            <Input
                                id="language"
                                name="language"
                                value={formData.language}
                                onChange={(e) => handleChange(e, "language")}
                                placeholder="Enter course language"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Topics */}
                {formData.topics.map((topic, topicIndex) => (
                    <Card key={topicIndex}>
                        <CardHeader>
                            <CardTitle className="text-xl">Topic: {topic.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {topic.subtopics.map((subtopic, subtopicIndex) => (
                                <div key={subtopicIndex}>
                                    <div className="flex flex-col gap-4 mb-4">
                                        <Label htmlFor={`subtopic-name-${subtopicIndex}`}>Subtopic Name</Label>
                                        <Input
                                            id={`subtopic-name-${subtopicIndex}`}
                                            value={subtopic.name}
                                            onChange={(e) => handleTopicChange(e, topicIndex, subtopicIndex, "name")}
                                            placeholder="Enter subtopic name"
                                        />
                                    </div>
                                    {subtopic.videos.map((video, videoIndex) => (
                                        <div key={videoIndex}>
                                            <div className="flex flex-col gap-4 mb-4">
                                                <Label htmlFor={`video-title-${videoIndex}`}>Video Title</Label>
                                                <Input
                                                    id={`video-title-${videoIndex}`}
                                                    value={video.title}
                                                    onChange={(e) => handleVideoChange(e, topicIndex, subtopicIndex, videoIndex, "title")}
                                                    placeholder="Enter video title"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-4 mb-4">
                                                <Label htmlFor={`video-description-${videoIndex}`}>Video Description</Label>
                                                <Textarea
                                                    id={`video-description-${videoIndex}`}
                                                    value={video.description}
                                                    onChange={(e) => handleVideoChange(e, topicIndex, subtopicIndex, videoIndex, "description")}
                                                    placeholder="Enter video description"
                                                    rows={2}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-4">
                                                <Label htmlFor={`video-url-${videoIndex}`}>Video URL</Label>
                                                <Input
                                                    id={`video-url-${videoIndex}`}
                                                    value={video.url}
                                                    onChange={(e) => handleVideoChange(e, topicIndex, subtopicIndex, videoIndex, "url")}
                                                    placeholder="Enter video URL"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                ))}

                {/* Course Options */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Course Options</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col gap-4">
                            <Label htmlFor="benefits">Course Benefits</Label>
                            <Textarea
                                id="benefits"
                                name="benefits"
                                value={formData.courseOptions.benefits}
                                onChange={(e) => handleChange(e, "courseOptions.benefits")}
                                placeholder="Enter course benefits"
                                rows={4}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <Label htmlFor="prerequisites">Course Prerequisites</Label>
                            <Textarea
                                id="prerequisites"
                                name="prerequisites"
                                value={formData.courseOptions.prerequisites}
                                onChange={(e) => handleChange(e, "courseOptions.prerequisites")}
                                placeholder="Enter course prerequisites"
                                rows={4}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Study Materials */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Study Materials</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {formData.studyMaterials.map((material, index) => (
                            <div key={index}>
                                <div className="flex flex-col gap-4 mb-4">
                                    <Label htmlFor={`material-name-${index}`}>Material Name</Label>
                                    <Input
                                        id={`material-name-${index}`}
                                        value={material.name}
                                        onChange={(e) => handleStudyMaterialChange(e, index, "name")}
                                        placeholder="Enter material name"
                                    />
                                </div>
                                <div className="flex flex-col gap-4 mb-4">
                                    <Label htmlFor={`material-file-name-${index}`}>File Name</Label>
                                    <Input
                                        id={`material-file-name-${index}`}
                                        value={material.fileName}
                                        onChange={(e) => handleStudyMaterialChange(e, index, "fileName")}
                                        placeholder="Enter file name"
                                    />
                                </div>
                                <div className="flex flex-col gap-4 mb-4">
                                    <Label htmlFor={`material-file-url-${index}`}>File URL</Label>
                                    <Input
                                        id={`material-file-url-${index}`}
                                        value={material.fileUrl}
                                        onChange={(e) => handleStudyMaterialChange(e, index, "fileUrl")}
                                        placeholder="Enter file URL"
                                    />
                                </div>
                                <div className="flex flex-col gap-4">
                                    <Label htmlFor={`material-download-url-${index}`}>Download URL</Label>
                                    <Input
                                        id={`material-download-url-${index}`}
                                        value={material.downloadUrl}
                                        onChange={(e) => handleStudyMaterialChange(e, index, "downloadUrl")}
                                        placeholder="Enter download URL"
                                    />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Buttons */}
                <div className="flex gap-4">
                    <Button type="submit">Save Changes</Button>
                    <Button type="button" onClick={onCancel}>Cancel</Button>
                </div>
            </form>
        </div>
    );
};

export default EditCourse;
