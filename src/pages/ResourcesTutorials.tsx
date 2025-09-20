import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ResourcesTutorials = () => {
  return (
    <div className="min-h-screen bg-background text-[#0c3d5e]">
      <Navigation />
      
      {/* Breadcrumb */}
      <div className="pt-20 pb-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/resources" className="text-[#0c3d5e]/70 hover:text-primary transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Resources
            </Link>
          </Button>
        </div>
      </div>

      {/* Header */}
      <section className="pb-16 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-32 w-[40rem] h-[40rem] bg-gradient-to-br from-manamind to-manamind-dark opacity-20 blur-3xl rounded-full" />
          <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-gradient-to-tr from-manadvise to-secondary opacity-20 blur-3xl rounded-full" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#0c3d5e] mb-6">
            Tutorials for Manamind
          </h1>
          <p className="text-xl text-[#0c3d5e]/80">
            Choose your learning path and get started with immersive video tutorials 🚀
          </p>
        </div>
      </section>

      {/* Tutorial Categories */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-stretch">
            
            {/* Student Tutorials */}
            <Card className="flex flex-col justify-between group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-manamind/10 to-manamind/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative z-10 text-center pb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-md">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-[#0c3d5e]">
                  Student
                </CardTitle>
                <CardDescription className="text-base text-[#0c3d5e]/80">
                  Master the learning experience and track your progress
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 flex flex-col flex-grow justify-between">
                <div className="space-y-3 mb-6 text-sm text-[#0c3d5e]/80">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span>Platform navigation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span>Skills assessment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span>Progress tracking</span>
                  </div>
                </div>
                <Button 
                  asChild 
                  size="lg" 
                  className="w-full mt-auto bg-gradient-to-r from-green-400 to-emerald-600 text-white font-medium shadow-md hover:opacity-90"
                >
                  <Link to="/resources/tutorials/student">
                    Start learning
                    <GraduationCap className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Teacher Tutorials */}
            <Card className="flex flex-col justify-between group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-manadvise/10 to-manadvise/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative z-10 text-center pb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-manadvise to-manadvise-dark flex items-center justify-center shadow-md">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-[#0c3d5e]">
                  Teacher
                </CardTitle>
                <CardDescription className="text-base text-[#0c3d5e]/80">
                  Create engaging learning paths and manage your students
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 flex flex-col flex-grow justify-between">
                <div className="space-y-3 mb-6 text-sm text-[#0c3d5e]/80">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-manadvise" />
                    <span>Path creation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-manadvise" />
                    <span>Student management</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-manadvise" />
                    <span>Progress monitoring</span>
                  </div>
                </div>
                <Button 
                  asChild 
                  size="lg" 
                  className="w-full mt-auto bg-gradient-to-r from-manadvise to-secondary text-white font-medium shadow-md hover:opacity-90"
                >
                  <Link to="/resources/tutorials/teacher">
                    Start teaching
                    <Users className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ResourcesTutorials;
