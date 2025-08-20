import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Menu, X, Mail, Calendar, Users, BookOpen, Brain, Shield, ArrowRight, Clock, MapPin, ExternalLink, Github, Linkedin, Twitter } from 'lucide-react';

// Custom hook for scroll animations
const useScrollAnimation = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isVisible];
};

// Navigation Component
const Navigation = ({ currentPage, setCurrentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button onClick={() => handleNavClick('home')} className="flex items-center space-x-3 hover:opacity-80">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">NAISI</span>
          </button>

          <div className="hidden md:flex items-center space-x-8">
            {['home', 'about', 'programs', 'events', 'resources'].map((page) => (
              <button
                key={page}
                onClick={() => handleNavClick(page)}
                className={`text-gray-700 hover:text-blue-600 transition-colors capitalize ${
                  currentPage === page ? 'text-blue-600 font-semibold' : ''
                }`}
              >
                {page === 'home' ? 'Home' : page.charAt(0).toUpperCase() + page.slice(1)}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('join')}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all transform hover:scale-105"
            >
              Join Us
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            {['home', 'about', 'programs', 'events', 'resources', 'join'].map((page) => (
              <button
                key={page}
                onClick={() => handleNavClick(page)}
                className="block w-full text-left py-2 text-gray-700 hover:text-blue-600 capitalize"
              >
                {page === 'home' ? 'Home' : page.charAt(0).toUpperCase() + page.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

// Home Page Component
const HomePage = ({ setCurrentPage }) => {
  const [ref1, isVisible1] = useScrollAnimation();
  const [ref2, isVisible2] = useScrollAnimation();
  const [ref3, isVisible3] = useScrollAnimation();
  const [ref4, isVisible4] = useScrollAnimation();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&h=1080&fit=crop" 
            alt="AI Background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/80 to-cyan-700/90"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-sm rounded-2xl mb-8">
              <Brain className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Nottingham AI Safety Initiative
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-4">
              Building a Responsible AI Future Together
            </p>
            <p className="text-lg md:text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
              Join our inclusive community working to ensure AI benefits everyone. 
              No computer science background required – all perspectives are valuable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setCurrentPage('join')}
                className="bg-white text-blue-900 px-8 py-4 rounded-full font-semibold hover:shadow-2xl transition-all transform hover:scale-105 inline-flex items-center justify-center"
              >
                Join Our Community <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button 
                onClick={() => setCurrentPage('about')}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-900 transition-all"
              >
                Learn More
              </button>
            </div>
          </div>
          <div className="animate-bounce mt-12">
            <ChevronDown className="w-8 h-8 text-white mx-auto" />
          </div>
        </div>
      </section>

      {/* Why AI Safety Section */}
      <section ref={ref1} className={`py-20 px-4 transition-all duration-1000 ${isVisible1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why AI Safety Matters</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              As AI systems become more powerful, ensuring they remain beneficial becomes critical for everyone
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Protecting Society",
                description: "Ensuring AI systems are safe, reliable, and aligned with human values",
                image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Inclusive Development",
                description: "Bringing diverse perspectives to shape how AI impacts our world",
                image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop"
              },
              {
                icon: <Brain className="w-8 h-8" />,
                title: "Future Thinking",
                description: "Addressing challenges before they arise through proactive research",
                image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=300&fit=crop"
              }
            ].map((item, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                <div className="p-6 bg-white">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg mb-4 text-white">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Paths Section */}
      <section ref={ref2} className={`py-20 px-4 bg-gray-50 transition-all duration-1000 ${isVisible2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Find Your Path</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose how you want to engage based on your interests and available time
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Mail />, title: "Stay Informed", time: "5 min/month", color: "from-purple-500 to-pink-500" },
              { icon: <Calendar />, title: "Attend Events", time: "2 hrs/month", color: "from-blue-500 to-cyan-500" },
              { icon: <BookOpen />, title: "Join Study Groups", time: "2 hrs/week", color: "from-green-500 to-teal-500" },
              { icon: <Brain />, title: "Fellowship Program", time: "5 hrs/week", color: "from-orange-500 to-red-500" }
            ].map((path, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${path.color} rounded-xl flex items-center justify-center text-white mb-4`}>
                  {path.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{path.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{path.time}</p>
                <button 
                  onClick={() => setCurrentPage('programs')}
                  className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
                >
                  Learn more <ArrowRight className="ml-1 w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section ref={ref3} className={`py-20 px-4 transition-all duration-1000 ${isVisible3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
            <p className="text-xl text-gray-600">All events are beginner-friendly with refreshments provided</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Weekly Discussion Group",
                date: "Every Tuesday",
                time: "6:00 PM",
                location: "Portland Building",
                image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop"
              },
              {
                title: "AI Ethics Workshop",
                date: "First Monday",
                time: "5:30 PM",
                location: "Jubilee Campus",
                image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&h=250&fit=crop"
              },
              {
                title: "Policy Forum",
                date: "Third Thursday",
                time: "7:00 PM",
                location: "Law Building",
                image: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?w=400&h=250&fit=crop"
              }
            ].map((event, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{event.title}</h3>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                  </div>
                  <button 
                    onClick={() => setCurrentPage('events')}
                    className="mt-4 inline-block text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ref4} className={`py-20 px-4 transition-all duration-1000 ${isVisible4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-xl mb-8 opacity-95">
              Join our community and help shape the future of AI safety. No experience required!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setCurrentPage('join')}
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
              >
                Get Started
              </button>
              <a href="mailto:ai-safety@nottingham.ac.uk" className="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// About Page
const AboutPage = () => {
  const [ref1, isVisible1] = useScrollAnimation();
  const [ref2, isVisible2] = useScrollAnimation();

  return (
    <div className="pt-20">
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">About NAISI</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            The Nottingham AI Safety Initiative brings together students and researchers from all disciplines 
            to work on one of the most important challenges of our time.
          </p>
        </div>
      </section>

      <section ref={ref1} className={`py-16 px-4 transition-all duration-1000 ${isVisible1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              We believe that ensuring AI systems remain beneficial and aligned with human values is not just a 
              technical challenge, but a societal one that requires diverse perspectives and backgrounds.
            </p>
            <p className="text-gray-600 mb-4">
              Our mission is to create an inclusive community where students from computer science, philosophy, 
              politics, law, arts, and all other disciplines can contribute to AI safety research and policy.
            </p>
            <p className="text-gray-600">
              We provide education, research opportunities, and pathways to careers in AI safety, making this 
              critical field accessible to everyone regardless of their technical background.
            </p>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop" 
              alt="Team collaboration" 
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section ref={ref2} className={`py-16 px-4 bg-gray-50 transition-all duration-1000 ${isVisible2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Inclusivity",
                description: "We welcome and value perspectives from all backgrounds and disciplines.",
                icon: <Users className="w-8 h-8" />
              },
              {
                title: "Collaboration",
                description: "We believe the best solutions come from working together across boundaries.",
                icon: <Brain className="w-8 h-8" />
              },
              {
                title: "Impact",
                description: "We focus on research and action that makes a real difference in AI safety.",
                icon: <Shield className="w-8 h-8" />
              }
            ].map((value, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl text-white mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Programs Page
const ProgramsPage = () => {
  const [ref1, isVisible1] = useScrollAnimation();

  return (
    <div className="pt-20">
      <section className="py-16 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Programs</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            From casual participation to intensive research, find the right level of engagement for you.
          </p>
        </div>
      </section>

      <section ref={ref1} className={`py-16 px-4 transition-all duration-1000 ${isVisible1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="space-y-8">
            {[
              {
                title: "Introduction Workshop Series",
                duration: "4 weeks",
                commitment: "2 hours/week",
                description: "Perfect for beginners. Learn the fundamentals of AI safety through interactive workshops.",
                topics: ["AI Basics", "Safety Challenges", "Ethics & Policy", "Career Paths"],
                color: "from-green-500 to-teal-500"
              },
              {
                title: "Technical Fellowship",
                duration: "8 weeks",
                commitment: "5 hours/week",
                description: "Dive deep into technical AI safety research with mentorship and hands-on projects.",
                topics: ["Machine Learning", "Alignment Theory", "Research Methods", "Paper Implementation"],
                color: "from-blue-500 to-cyan-500"
              },
              {
                title: "Policy Fellowship",
                duration: "8 weeks",
                commitment: "5 hours/week",
                description: "Explore AI governance, policy, and regulation. No technical background required.",
                topics: ["AI Governance", "Policy Analysis", "International Cooperation", "Risk Assessment"],
                color: "from-purple-500 to-pink-500"
              },
              {
                title: "Research Apprenticeship",
                duration: "3-6 months",
                commitment: "10+ hours/week",
                description: "Work on cutting-edge AI safety research with faculty and PhD students.",
                topics: ["Original Research", "Paper Writing", "Conference Presentations", "Publication"],
                color: "from-orange-500 to-red-500"
              }
            ].map((program, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
                <div className={`h-2 bg-gradient-to-r ${program.color}`}></div>
                <div className="p-8">
                  <div className="flex flex-wrap items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold">{program.title}</h3>
                    <div className="flex gap-4 text-sm text-gray-500 mt-2 sm:mt-0">
                      <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {program.duration}</span>
                      <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {program.commitment}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {program.topics.map((topic, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                        {topic}
                      </span>
                    ))}
                  </div>
                  <button className="mt-6 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Events Page
const EventsPage = () => {
  const [ref1, isVisible1] = useScrollAnimation();

  return (
    <div className="pt-20">
      <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Events</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Join our regular events to learn, discuss, and connect with the AI safety community.
          </p>
        </div>
      </section>

      <section ref={ref1} className={`py-16 px-4 transition-all duration-1000 ${isVisible1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Weekly Discussion Group",
                type: "Regular Meeting",
                date: "Every Tuesday",
                time: "6:00 PM - 8:00 PM",
                location: "Portland Building, Room 201",
                description: "Casual discussions about current AI safety topics. This week: 'AI in Healthcare'",
                image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&h=400&fit=crop"
              },
              {
                title: "Guest Speaker: Dr. Sarah Chen",
                type: "Special Event",
                date: "November 15, 2024",
                time: "5:00 PM - 6:30 PM",
                location: "Engineering Building, Lecture Hall A",
                description: "Leading AI safety researcher discusses latest developments in alignment research",
                image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=400&fit=crop"
              },
              {
                title: "Beginner's Workshop",
                type: "Workshop",
                date: "First Monday of each month",
                time: "5:30 PM - 7:30 PM",
                location: "Jubilee Campus, Lab 3",
                description: "Introduction to AI safety concepts for newcomers. No background required!",
                image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop"
              },
              {
                title: "AI Safety Film Night",
                type: "Social Event",
                date: "November 22, 2024",
                time: "7:00 PM - 10:00 PM",
                location: "Student Union Cinema",
                description: "Watch and discuss films exploring AI themes. Popcorn provided!",
                image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=400&fit=crop"
              }
            ].map((event, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {event.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                  </div>
                  <button className="mt-4 text-blue-600 hover:text-blue-700 font-medium inline-flex items-center">
                    Add to Calendar <ExternalLink className="ml-1 w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Resources Page
const ResourcesPage = () => {
  const [ref1, isVisible1] = useScrollAnimation();

  return (
    <div className="pt-20">
      <section className="py-16 px-4 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Resources</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Curated materials to help you learn about AI safety at your own pace.
          </p>
        </div>
      </section>

      <section ref={ref1} className={`py-16 px-4 transition-all duration-1000 ${isVisible1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "AI Safety Fundamentals", type: "Course", icon: <BookOpen />, level: "Beginner" },
              { title: "Technical Papers Collection", type: "Research", icon: <Brain />, level: "Advanced" },
              { title: "Policy & Governance Guide", type: "Guide", icon: <Shield />, level: "Intermediate" },
              { title: "Career Pathways in AI Safety", type: "Career", icon: <Users />, level: "All Levels" },
              { title: "Weekly Newsletter Archive", type: "Newsletter", icon: <Mail />, level: "All Levels" },
              { title: "Recommended Podcasts", type: "Media", icon: <Calendar />, level: "Beginner" }
            ].map((resource, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center text-white">
                    {resource.icon}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    resource.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                    resource.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                    resource.level === 'Advanced' ? 'bg-red-100 text-red-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {resource.level}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{resource.type}</p>
                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center">
                  Access Resource <ArrowRight className="ml-1 w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Join Page
const JoinPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);

  const handleSubmit = () => {
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
        setSelectedInterests([]);
      }, 3000);
    }
  };

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  return (
    <div className="pt-20">
      <section className="py-16 px-4 bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Join NAISI</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-95">
            Take the first step in your AI safety journey. We're excited to welcome you to our community!
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Get Started</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@nottingham.ac.uk"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  I'm interested in... (select all that apply)
                </label>
                <div className="space-y-3">
                  {['Technical Research', 'Policy & Governance', 'Events & Workshops', 'Reading Groups', 'Career Development'].map((interest) => (
                    <label key={interest} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input 
                        type="checkbox" 
                        checked={selectedInterests.includes(interest)}
                        onChange={() => toggleInterest(interest)}
                        className="mr-3 rounded text-blue-600" 
                      />
                      <span>{interest}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Background (optional)
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Select your field of study</option>
                  <option>Computer Science</option>
                  <option>Philosophy</option>
                  <option>Politics/International Relations</option>
                  <option>Law</option>
                  <option>Engineering</option>
                  <option>Natural Sciences</option>
                  <option>Social Sciences</option>
                  <option>Arts & Humanities</option>
                  <option>Other</option>
                </select>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Join Our Community
              </button>

              {submitted && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                  ✓ Thank you for joining! Check your email for next steps.
                </div>
              )}
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="font-semibold mb-4">Other Ways to Connect</h3>
              <div className="space-y-3">
                <a href="#" className="flex items-center text-gray-600 hover:text-blue-600">
                  <Mail className="w-5 h-5 mr-3" />
                  ai-safety@nottingham.ac.uk
                </a>
                <a href="#" className="flex items-center text-gray-600 hover:text-blue-600">
                  <Github className="w-5 h-5 mr-3" />
                  GitHub: nottingham-ai-safety
                </a>
                <a href="#" className="flex items-center text-gray-600 hover:text-blue-600">
                  <Linkedin className="w-5 h-5 mr-3" />
                  LinkedIn: NAISI
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Footer Component
const Footer = ({ setCurrentPage }) => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl">NAISI</span>
            </div>
            <p className="text-gray-400">
              Building a responsible AI future through inclusive collaboration.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <button onClick={() => setCurrentPage('about')} className="block text-gray-400 hover:text-white">About</button>
              <button onClick={() => setCurrentPage('programs')} className="block text-gray-400 hover:text-white">Programs</button>
              <button onClick={() => setCurrentPage('events')} className="block text-gray-400 hover:text-white">Events</button>
              <button onClick={() => setCurrentPage('resources')} className="block text-gray-400 hover:text-white">Resources</button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-white">Discord</a>
              <a href="#" className="block text-gray-400 hover:text-white">LinkedIn</a>
              <a href="#" className="block text-gray-400 hover:text-white">Twitter</a>
              <a href="#" className="block text-gray-400 hover:text-white">GitHub</a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Partners</h4>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-white">University of Nottingham</a>
              <a href="#" className="block text-gray-400 hover:text-white">UK AI Safety Network</a>
              <a href="#" className="block text-gray-400 hover:text-white">Student Union</a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2024 Nottingham AI Safety Initiative. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    // Add global styles
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fade-in-up {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .animate-fade-in-up {
        animation: fade-in-up 1s ease-out;
      }
      
      @keyframes bounce {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-10px);
        }
      }
      
      .animate-bounce {
        animation: bounce 2s ease-in-out infinite;
      }
      
      * {
        scroll-behavior: smooth;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const renderPage = () => {
    switch(currentPage) {
      case 'about':
        return <AboutPage />;
      case 'programs':
        return <ProgramsPage />;
      case 'events':
        return <EventsPage />;
      case 'resources':
        return <ResourcesPage />;
      case 'join':
        return <JoinPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}