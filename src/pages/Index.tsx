import { Button } from '@/components/ui/button';
import { Award, Brain, FileText, GraduationCap, Lock, Star, TrendingUp, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient Background */}
      <section className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-soft-light opacity-30 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-soft-light opacity-20 animate-pulse"></div>
        </div>
        
        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white/10 p-4 rounded-full backdrop-blur-sm">
                <GraduationCap className="h-16 w-16 text-blue-300" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
              SkillForge
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 font-light">
              AI-Driven Adaptive Learning & Exam Generator
            </p>
            <p className="text-lg mb-12 text-blue-200 max-w-2xl mx-auto font-extralight">
              Transform your learning experience with intelligent assessments, 
              personalized feedback, and automated certificate generation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Sign In
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/login')}
                className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 rounded-xl backdrop-blur-sm transition-all duration-300"
              >
                Create Account
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Cards */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Powerful Learning Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to enhance your educational journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Adaptive Learning",
                description: "Personalized learning paths that adapt to your progress and knowledge gaps",
                icon: Brain,
                color: "text-blue-500",
                bg: "bg-blue-50"
              },
              {
                title: "AI-Powered Exams",
                description: "Generate customized assessments based on your curriculum and learning objectives",
                icon: FileText,
                color: "text-purple-500",
                bg: "bg-purple-50"
              },
              {
                title: "Instant Feedback",
                description: "Get immediate, detailed feedback on your performance with explanations",
                icon: Zap,
                color: "text-yellow-500",
                bg: "bg-yellow-50"
              },
              {
                title: "Progress Tracking",
                description: "Monitor your learning journey with comprehensive analytics and insights",
                icon: TrendingUp,
                color: "text-green-500",
                bg: "bg-green-50"
              },
              {
                title: "Automated Grading",
                description: "Save time with our intelligent auto-grading system for objective assessments",
                icon: Lock,
                color: "text-red-500",
                bg: "bg-red-50"
              },
              {
                title: "Certificate Generation",
                description: "Earn verified certificates upon course completion for your achievements",
                icon: Award,
                color: "text-indigo-500",
                bg: "bg-indigo-50"
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-shadow duration-300 group">
                  <div className={`${feature.bg} w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`${feature.color} h-8 w-8`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "10K+", label: "Active Students" },
              { value: "500+", label: "Expert Teachers" },
              { value: "50+", label: "Courses Available" },
              { value: "98%", label: "Satisfaction Rate" }
            ].map((stat, index) => (
              <div key={index} className="p-4">
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">What Our Users Say</h2>
            <p className="text-xl text-gray-600">Trusted by students and educators worldwide</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Johnson",
                role: "Computer Science Student",
                content: "SkillForge transformed my learning experience. The adaptive assessments helped me identify my weak areas and improve significantly.",
                avatar: "AJ"
              },
              {
                name: "Dr. Sarah Williams",
                role: "University Professor",
                content: "As an educator, I've seen tremendous improvement in my students' performance since implementing SkillForge in my curriculum.",
                avatar: "SW"
              },
              {
                name: "Michael Chen",
                role: "Self-Taught Developer",
                content: "The AI-powered exams and instant feedback helped me land my dream job. I couldn't be more grateful for this platform.",
                avatar: "MC"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Learning?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
            Join thousands of students and educators using SkillForge to achieve their learning goals
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/login')}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Get Started Today
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;