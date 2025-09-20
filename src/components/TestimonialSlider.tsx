
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  content: string;
  author: string;
  position: string;
  company: string;
  rating: number;
  entity?: "manamind" | "manacademy" | "manadvise";
  photo?: string;
}

interface TestimonialSliderProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
}

const TestimonialSlider = ({ 
  testimonials, 
  autoPlay = true, 
  interval = 5000 
}: TestimonialSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, testimonials.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
  };

  if (testimonials.length === 0) return null;

  const currentTestimonial = testimonials[currentIndex];

  const entityColors = {
    manamind: "border-manamind/20 bg-manamind-light/50",
    manacademy: "border-manacademy/20 bg-manacademy-light/50",
    manadvise: "border-manadvise/20 bg-manadvise-light/50"
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className={`p-8 rounded-2xl border-2 transition-all duration-500 ${
        currentTestimonial.entity 
          ? entityColors[currentTestimonial.entity]
          : "border-border bg-card"
      }`}>
        
        {/* Content */}
        <blockquote className="text-lg md:text-xl leading-relaxed text-foreground mb-6">
          "{currentTestimonial.content}"
        </blockquote>
        
        {/* Author */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Photo */}
            {currentTestimonial.photo && (
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={currentTestimonial.photo}
                  alt={currentTestimonial.author}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div>
              <cite className="font-semibold text-primary not-italic">
                {currentTestimonial.author}
              </cite>
              <div className="text-sm text-muted-foreground">
                {currentTestimonial.position} • {currentTestimonial.company}
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Indicators */}
      <div className="flex justify-center space-x-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-primary w-8"
                : "bg-border hover:bg-muted-foreground"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;
