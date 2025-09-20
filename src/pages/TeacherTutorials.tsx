import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, ArrowLeft, Clock, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Tutorial = {
  id: string;
  title: string;
  summary: string;
  duration: string;
  views: string;
  youtubeId: string;   // we work with the YouTube ID
  isPremium?: boolean;
};

const TeacherTutorials = () => {
  const [openVideoId, setOpenVideoId] = useState<string | null>(null);

  const tutorials: Tutorial[] = [
    {
      id: "edit-path",
      title: "Edit your path",
      summary: "Learn how to create and customize learning paths for your students.",
      duration: "12 min",
      views: "2.1k",
      youtubeId: "NvEDsW7R-RY",
    },
    {
      id: "project-creation",
      title: "Project creation and member invitations",
      summary: "Step-by-step guide to creating projects and inviting team members.",
      duration: "8 min",
      views: "1.8k",
      youtubeId: "cu5404jIffc",
    },
    {
      id: "monitor-progress",
      title: "Monitor and evaluate team progress",
      summary: "Track student progress and provide meaningful feedback.",
      duration: "15 min",
      views: "1.5k",
      youtubeId: "UYCBPCP_Tno",
    },
    {
      id: "dashboard-workspace",
      title: "Manage your projects using the Dashboard Workspace (Premium)",
      summary: "Advanced project management features available in premium tier.",
      duration: "10 min",
      views: "923",
      youtubeId: "K0WnQ8DDauQ",
      isPremium: true,
    },
    {
      id: "soft-skills-setup",
      title: "Set up the Soft Skills Assessment Module",
      summary: "Configure behavioral skills evaluations for comprehensive student assessment.",
      duration: "7 min",
      views: "1.1k",
      youtubeId: "XdbYMdI2dW0",
    },
  ];

  const getThumb = (ytId: string) =>
    `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  const getEmbed = (ytId: string) =>
    `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <div className="min-h-screen bg-background text-[#0c3d5e]">
      <Navigation />
      
      {/* Breadcrumb */}
      <div className="pt-20 pb-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-[#0c3d5e]/80">
            <Link to="/resources" className="hover:text-[#0c3d5e] transition-colors">Resources</Link>
            <span>→</span>
            <Link to="/resources/tutorials" className="hover:text-[#0c3d5e] transition-colors">Tutorials</Link>
            <span>→</span>
            <span className="text-[#0c3d5e]">Teacher</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link to="/resources/tutorials" className="text-[#0c3d5e]/80 hover:text-[#0c3d5e]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tutorials
            </Link>
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0c3d5e] mb-6">
            Teacher Tutorials
          </h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-[#0c3d5e]/80">
              Welcome to this series of tutorials dedicated to getting started with Manamind, an innovative solution designed to create and run customized learning paths, focused on skill development.
            </p>
            <p className="text-[#0c3d5e]/80">
              Whether you're a new user or already familiar with the tool, this series will guide you step by step to help you make the most of all its features.
            </p>
          </div>
        </div>
      </section>

      {/* Tutorial List */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6">
            {tutorials.map((tutorial, index) => (
              <Card
                key={tutorial.id}
                className="group hover:shadow-elegant transition-all duration-300 overflow-hidden"
              >
                <div className="md:flex">
                  {/* Video Thumbnail */}
                  <div className="md:w-1/3 relative">
                    <div className="aspect-video relative overflow-hidden bg-muted">
                      <img
                        src={getThumb(tutorial.youtubeId)}
                        alt={`${tutorial.title} thumbnail`}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      {/* Play overlay */}
                      <button
                        onClick={() => setOpenVideoId(tutorial.youtubeId)}
                        className="absolute inset-0 flex items-center justify-center"
                        aria-label={`Play ${tutorial.title}`}
                      >
                        <span className="w-16 h-16 rounded-full bg-manadvise/90 flex items-center justify-center shadow-md hover:bg-manadvise transition-colors">
                          <Play className="h-8 w-8 text-white ml-1" />
                        </span>
                      </button>
                      {/* Duration tag */}
                      <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {tutorial.duration}
                      </div>
                      {tutorial.isPremium && (
                        <div className="absolute top-3 left-3 bg-manacademy text-white text-xs px-2 py-1 rounded font-medium">
                          Premium
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-manadvise/10 text-manadvise">
                        Tutorial {index + 1}
                      </span>
                      <div className="flex items-center gap-4 text-sm text-[#0c3d5e]/70">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {tutorial.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {tutorial.views}
                        </div>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-[#0c3d5e] mb-3">
                      {tutorial.title}
                    </h3>

                    <p className="text-[#0c3d5e]/80 mb-4">
                      {tutorial.summary}
                    </p>

                    <Button
                      variant="outline"
                      className="group-hover:bg-manadvise/10 group-hover:border-manadvise transition-colors"
                      onClick={() => setOpenVideoId(tutorial.youtubeId)}
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Watch Tutorial
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modal YouTube Player */}
      <Dialog open={!!openVideoId} onOpenChange={() => setOpenVideoId(null)}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle className="text-[#0c3d5e]">Manamind Tutorial</DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full">
            {openVideoId && (
              <iframe
                className="w-full h-full"
                src={getEmbed(openVideoId)}
                title="Manamind tutorial video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default TeacherTutorials;
