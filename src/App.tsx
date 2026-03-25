import { useState, useEffect, createContext, useContext, FormEvent } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate, 
  Link, 
  useNavigate,
  useLocation,
  useParams
} from 'react-router-dom';
import { 
  BookOpen, 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Search, 
  ShoppingCart, 
  Bell,
  ChevronRight,
  Star,
  PlayCircle,
  CheckCircle,
  Award,
  BarChart3,
  Plus,
  FileText,
  CreditCard,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type Role = 'ADMIN' | 'INSTRUCTOR' | 'STUDENT';

interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

interface Course {
  id: number;
  title: string;
  instructor: any; // Can be string (mock) or object (backend)
  price: number;
  rating: number;
  reviews: number;
  thumbnail: string;
  category: string;
  enrolled: number;
  progress?: number;
}

// --- Context ---
const AuthContext = createContext<{
  user: User | null;
  login: (email: string, role: Role) => void;
  logout: () => void;
}>({
  user: null,
  login: () => {},
  logout: () => {},
});

const useAuth = () => useContext(AuthContext);

// --- Components ---

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <BookOpen className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">LMS<span className="text-indigo-600">Pro</span></span>
            </Link>
            <div className="hidden md:ml-8 md:flex md:space-x-8">
              <span className="hidden lg:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-100 text-green-700 border border-green-200 mr-2">
                Spring Boot Backend
              </span>
              <Link to="/courses" className="text-slate-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium">Courses</Link>
              <Link to="/blog" className="text-slate-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium">Blog</Link>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search courses..." 
                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-indigo-500 w-64"
              />
            </div>
            <Link to="/cart" className="text-slate-600 hover:text-indigo-600 relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">2</span>
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="flex items-center space-x-2 text-slate-700 hover:text-indigo-600">
                  <LayoutDashboard className="w-5 h-5" />
                  <span className="text-sm font-medium">Dashboard</span>
                </Link>
                <button onClick={logout} className="text-slate-600 hover:text-red-600">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="text-slate-600 hover:text-indigo-600 text-sm font-medium">Log in</Link>
                <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">Join for Free</Link>
              </div>
            )}
          </div>

          <div className="flex md:hidden items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              <Link to="/courses" className="block px-3 py-2 text-base font-medium text-slate-600">Courses</Link>
              <Link to="/blog" className="block px-3 py-2 text-base font-medium text-slate-600">Blog</Link>
              {user ? (
                <>
                  <Link to="/dashboard" className="block px-3 py-2 text-base font-medium text-slate-600">Dashboard</Link>
                  <button onClick={logout} className="block w-full text-left px-3 py-2 text-base font-medium text-red-600">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block px-3 py-2 text-base font-medium text-slate-600">Log in</Link>
                  <Link to="/register" className="block px-3 py-2 text-base font-medium text-indigo-600">Sign up</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Pages ---

const LandingPage = () => {
  const featuredCourses: Course[] = [
    { id: 1, title: "Full Stack Web Development with React & Node", instructor: "Dr. Sarah Smith", price: 89.99, rating: 4.8, reviews: 1240, thumbnail: "https://picsum.photos/seed/web/800/450", category: "Development", enrolled: 5000 },
    { id: 2, title: "Mastering UI/UX Design Principles", instructor: "Alex Rivera", price: 59.99, rating: 4.9, reviews: 850, thumbnail: "https://picsum.photos/seed/design/800/450", category: "Design", enrolled: 3200 },
    { id: 3, title: "Data Science & Machine Learning Bootcamp", instructor: "Prof. James Wilson", price: 99.99, rating: 4.7, reviews: 2100, thumbnail: "https://picsum.photos/seed/data/800/450", category: "Data Science", enrolled: 8000 },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative bg-slate-900 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center space-y-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-extrabold text-white tracking-tight"
            >
              Master New Skills with <br />
              <span className="text-indigo-400">Expert-Led Courses</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto"
            >
              Join over 10 million learners worldwide and start your journey today. 
              Get unlimited access to 5,000+ top-rated courses.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row justify-center items-center gap-4"
            >
              <Link to="/courses" className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all transform hover:scale-105">
                Explore Courses
              </Link>
              <Link to="/register" className="w-full sm:w-auto bg-white/10 text-white border border-white/20 backdrop-blur-sm px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all">
                Become an Instructor
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
          <div className="text-center space-y-1">
            <div className="text-3xl font-bold text-slate-900">10k+</div>
            <div className="text-slate-500 text-sm font-medium">Expert Instructors</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-3xl font-bold text-slate-900">500k+</div>
            <div className="text-slate-500 text-sm font-medium">Active Students</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-3xl font-bold text-slate-900">5k+</div>
            <div className="text-slate-500 text-sm font-medium">Total Courses</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-3xl font-bold text-slate-900">99%</div>
            <div className="text-slate-500 text-sm font-medium">Satisfaction Rate</div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex justify-between items-end">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-slate-900">Featured Courses</h2>
            <p className="text-slate-500">Hand-picked courses by our experts to help you grow.</p>
          </div>
          <Link to="/courses" className="text-indigo-600 font-semibold flex items-center hover:underline">
            View all <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCourses.map((course) => (
            <motion.div 
              key={course.id}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-2xl hover:shadow-slate-200/50 transition-all group"
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={course.thumbnail} 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-indigo-600 shadow-sm">
                  {course.category}
                </div>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="font-bold text-lg text-slate-900 line-clamp-2 min-h-[3.5rem]">{course.title}</h3>
                <div className="flex items-center text-sm text-slate-500">
                  <span className="font-medium text-slate-700">{typeof course.instructor === 'object' ? course.instructor.name : course.instructor}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center text-amber-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="ml-1 font-bold text-slate-900">{course.rating}</span>
                  </div>
                  <span className="text-slate-400 text-xs">({course.reviews} reviews)</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="text-2xl font-bold text-slate-900">${course.price}</span>
                  <button className="bg-slate-100 text-slate-900 p-2 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors">
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-indigo-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-slate-900 leading-tight">
                Why Choose <span className="text-indigo-600">LMSPro</span> for Your Learning Journey?
              </h2>
              <div className="space-y-6">
                {[
                  { icon: PlayCircle, title: "Learn at Your Own Pace", desc: "Access courses 24/7 and learn whenever it fits your schedule." },
                  { icon: Award, title: "Earn Certificates", desc: "Get recognized for your hard work with industry-standard certificates." },
                  { icon: Users, title: "Community Support", desc: "Join discussion forums and get help from instructors and peers." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      <item.icon className="text-indigo-600 w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{item.title}</h3>
                      <p className="text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-indigo-600 rounded-3xl rotate-3 absolute inset-0 -z-10 opacity-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Students learning" 
                className="rounded-3xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const CoursePlayer = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [activeLecture, setActiveLecture] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/courses/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        setCourse(data);
        if (data.sections?.[0]?.lectures?.[0]) {
          setActiveLecture(data.sections[0].lectures[0]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching course for player:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden bg-slate-900">
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="aspect-video bg-black relative">
          {activeLecture?.videoUrl ? (
            <iframe 
              src={activeLecture.videoUrl.replace('watch?v=', 'embed/')} 
              className="w-full h-full"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-500">
              <PlayCircle className="w-20 h-20 opacity-20" />
            </div>
          )}
        </div>
        <div className="p-8 space-y-6 text-white">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">{activeLecture?.title || "Welcome to the Course"}</h1>
              <p className="text-slate-400 text-sm">Section: {course.sections?.find((s: any) => s.lectures?.some((l: any) => l.id === activeLecture?.id))?.title || "Intro"}</p>
            </div>
            <button className="bg-indigo-600 px-6 py-2 rounded-lg font-bold text-sm hover:bg-indigo-700 transition-colors">
              Mark as Complete
            </button>
          </div>
          <div className="prose prose-invert max-w-none">
            <p className="text-slate-300 leading-relaxed">
              {activeLecture?.content || "In this lesson, we will cover the core concepts of this topic. Make sure to follow along with the examples provided in the video."}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-96 bg-slate-800 border-l border-slate-700 flex flex-col">
        <div className="p-6 border-b border-slate-700">
          <h2 className="font-bold text-white">Course Content</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {course.sections?.map((section: any, i: number) => (
            <div key={i} className="border-b border-slate-700 last:border-none">
              <div className="px-6 py-3 bg-slate-900/50 text-xs font-bold text-slate-400 uppercase tracking-wider">
                Section {i + 1}: {section.title}
              </div>
              <div className="divide-y divide-slate-700/50">
                {section.lectures?.map((lecture: any) => (
                  <button 
                    key={lecture.id}
                    onClick={() => setActiveLecture(lecture)}
                    className={`w-full px-6 py-4 flex items-center gap-3 text-left hover:bg-slate-700 transition-colors ${activeLecture?.id === lecture.id ? 'bg-indigo-600/20 text-indigo-400' : 'text-slate-300'}`}
                  >
                    <div className="flex-shrink-0">
                      {activeLecture?.id === lecture.id ? <PlayCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4 opacity-30" />}
                    </div>
                    <span className="text-sm font-medium line-clamp-1">{lecture.title}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CertificatePreview = () => {
  const { user } = useAuth();
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 space-y-10">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">Your Certificate</h1>
        <p className="text-slate-500">Congratulations on completing the course!</p>
      </div>

      <div className="aspect-[1.414/1] bg-white border-[16px] border-indigo-900 p-16 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -mr-32 -mt-32 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-50 rounded-full -ml-32 -mb-32 opacity-50"></div>
        
        <div className="relative h-full flex flex-col items-center justify-between border-2 border-indigo-100 p-8">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <BookOpen className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">LMS<span className="text-indigo-600">Pro</span></span>
          </div>

          <div className="text-center space-y-8">
            <div className="space-y-2">
              <div className="text-sm font-bold text-indigo-600 uppercase tracking-[0.2em]">Certificate of Completion</div>
              <div className="text-slate-400 text-sm italic">This is to certify that</div>
            </div>
            
            <div className="text-5xl font-serif text-slate-900 border-b-2 border-slate-200 pb-4 px-12">
              {user?.name || "Demo Student"}
            </div>

            <div className="space-y-2">
              <div className="text-slate-400 text-sm italic">has successfully completed the course</div>
              <div className="text-2xl font-bold text-slate-900">Full Stack Web Development with React & Node</div>
            </div>
          </div>

          <div className="w-full flex justify-between items-end">
            <div className="text-center space-y-1">
              <div className="w-32 border-b border-slate-300 mb-2"></div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Instructor Signature</div>
            </div>
            <div className="w-20 h-20 bg-indigo-600/10 rounded-full flex items-center justify-center">
              <Award className="text-indigo-600 w-10 h-10" />
            </div>
            <div className="text-center space-y-1">
              <div className="w-32 border-b border-slate-300 mb-2"></div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Date Issued</div>
              <div className="text-xs font-bold text-slate-900">March 25, 2026</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors flex items-center">
          <FileText className="w-5 h-5 mr-2" /> Download PDF
        </button>
        <button className="bg-white border border-slate-200 text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors flex items-center">
          <Plus className="w-5 h-5 mr-2" /> Share on LinkedIn
        </button>
      </div>
    </div>
  );
};
const CurriculumBuilder = () => {
  const [sections, setSections] = useState([
    { id: 1, title: "Introduction", lectures: [{ id: 1, title: "Welcome" }, { id: 2, title: "Course Overview" }] },
    { id: 2, title: "Getting Started", lectures: [{ id: 3, title: "Installation" }] },
  ]);

  const addSection = () => {
    setSections([...sections, { id: Date.now(), title: "New Section", lectures: [] }]);
  };

  const addLecture = (sectionId: number) => {
    setSections(sections.map(s => s.id === sectionId ? { ...s, lectures: [...s.lectures, { id: Date.now(), title: "New Lecture" }] } : s));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-900">Curriculum Builder</h1>
        <button onClick={addSection} className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold flex items-center hover:bg-indigo-700">
          <Plus className="w-5 h-5 mr-2" /> Add Section
        </button>
      </div>

      <div className="space-y-6">
        {sections.map((section, sIdx) => (
          <div key={section.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Menu className="w-4 h-4 text-slate-400 cursor-move" />
                <input 
                  value={section.title} 
                  onChange={(e) => setSections(sections.map(s => s.id === section.id ? { ...s, title: e.target.value } : s))}
                  className="bg-transparent font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-2"
                />
              </div>
              <button onClick={() => addLecture(section.id)} className="text-indigo-600 text-sm font-bold flex items-center hover:underline">
                <Plus className="w-4 h-4 mr-1" /> Add Lecture
              </button>
            </div>
            <div className="p-4 space-y-2">
              {section.lectures.map((lecture, lIdx) => (
                <div key={lecture.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 group">
                  <div className="flex items-center gap-3">
                    <Menu className="w-3 h-3 text-slate-300 cursor-move" />
                    <span className="text-sm text-slate-700 font-medium">{lecture.title}</span>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1 text-slate-400 hover:text-indigo-600"><Settings className="w-4 h-4" /></button>
                    <button className="p-1 text-slate-400 hover:text-red-600"><X className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
              {section.lectures.length === 0 && (
                <div className="text-center py-4 text-slate-400 text-sm italic">No lectures yet.</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CourseCatalog = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/courses')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        setCourses(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching courses:", err);
        // Fallback to mock data if backend is not running
        setCourses([
          { id: 1, title: "Full Stack Web Development with React & Node", instructor: "Dr. Sarah Smith", price: 89.99, rating: 4.8, reviews: 1240, thumbnail: "https://picsum.photos/seed/web/800/450", category: "Development", enrolled: 5000 },
        ]);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Explore Courses</h1>
          <p className="text-slate-500">Discover your next skill from our collection of 5,000+ courses.</p>
        </div>
        <div className="flex gap-4">
          <select className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none">
            <option>All Categories</option>
            <option>Development</option>
            <option>Design</option>
            <option>Business</option>
          </select>
          <select className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none">
            <option>Sort by: Popular</option>
            <option>Newest</option>
            <option>Price: Low to High</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <motion.div 
            key={course.id}
            whileHover={{ y: -4 }}
            className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all group"
          >
            <Link to={`/course/${course.id}`}>
              <div className="aspect-video overflow-hidden">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
              </div>
              <div className="p-4 space-y-3">
                <h3 className="font-bold text-slate-900 line-clamp-2 h-10">{course.title}</h3>
                <p className="text-xs text-slate-500">{typeof course.instructor === 'object' ? course.instructor.name : course.instructor}</p>
                <div className="flex items-center space-x-1 text-amber-400">
                  <Star className="w-3 h-3 fill-current" />
                  <span className="text-xs font-bold text-slate-900">{course.rating || 4.5}</span>
                  <span className="text-slate-400 text-[10px]">({course.reviews || 0})</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-lg font-bold text-slate-900">${course.price}</span>
                  <button className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-lg transition-colors">
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/courses/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        setCourse(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching course details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
  if (!course) return <div className="text-center py-20">Course not found</div>;

  return (
    <div className="space-y-0">
      <section className="bg-slate-900 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex gap-2">
              <span className="bg-indigo-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{course.category}</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight">{course.title}</h1>
            <p className="text-slate-300 text-lg leading-relaxed">{course.description}</p>
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center text-amber-400">
                <Star className="w-4 h-4 fill-current mr-1" />
                <span className="font-bold text-white">{course.rating || 4.5}</span>
                <span className="text-slate-400 ml-1">(1,240 ratings)</span>
              </div>
              <div className="text-slate-300">Created by <span className="text-indigo-400 font-bold underline">{course.instructor?.name || course.instructor}</span></div>
              <div className="flex items-center text-slate-300">
                <Users className="w-4 h-4 mr-1" />
                <span>5,000 students enrolled</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="lg:absolute lg:top-0 lg:right-0 w-full bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900">
              <div className="aspect-video relative group">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <PlayCircle className="text-white w-16 h-16" />
                </div>
              </div>
              <div className="p-8 space-y-6">
                <div className="text-4xl font-bold">${course.price}</div>
                <div className="space-y-3">
                  <button className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                    Add to Cart
                  </button>
                  <button className="w-full py-4 border-2 border-slate-200 text-slate-900 rounded-xl font-bold hover:bg-slate-50 transition-all">
                    Buy Now
                  </button>
                </div>
                <div className="space-y-4 pt-4">
                  <div className="text-sm font-bold">This course includes:</div>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-center"><PlayCircle className="w-4 h-4 mr-3 text-slate-400" /> 12 hours on-demand video</li>
                    <li className="flex items-center"><FileText className="w-4 h-4 mr-3 text-slate-400" /> 15 downloadable resources</li>
                    <li className="flex items-center"><Award className="w-4 h-4 mr-3 text-slate-400" /> Certificate of completion</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="lg:w-2/3 space-y-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Course Content</h2>
            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              {[
                { title: "Introduction to the Course", lectures: 4, duration: "45m" },
                { title: "Setting up Environment", lectures: 6, duration: "1h 20m" },
                { title: "Core Concepts & Fundamentals", lectures: 12, duration: "3h 15m" },
              ].map((section, i) => (
                <div key={i} className="border-b border-slate-100 last:border-none">
                  <button className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                      <span className="font-bold text-slate-900">{section.title}</span>
                    </div>
                    <div className="text-xs text-slate-500 font-medium">{section.lectures} lectures • {section.duration}</div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Instructor</h2>
            <div className="flex gap-6 items-start">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex-shrink-0 flex items-center justify-center">
                <Users className="text-indigo-600 w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-indigo-600 underline">{course.instructor?.name || course.instructor}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Passionate educator with over 10 years of experience in the industry. 
                  Helping students master modern technologies through practical, hands-on learning.
                </p>
                <div className="flex gap-4 text-sm font-bold text-slate-700">
                  <div className="flex items-center"><Star className="w-4 h-4 mr-1 text-amber-400" /> 4.8 Instructor Rating</div>
                  <div className="flex items-center"><Users className="w-4 h-4 mr-1 text-slate-400" /> 15,000 Students</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const BlogPage = () => {
  const posts = [
    { id: 1, title: "The Future of Web Development in 2026", excerpt: "Exploring the latest trends in React, AI integration, and serverless architectures.", author: "Sarah Smith", date: "Mar 15, 2026", image: "https://picsum.photos/seed/blog1/800/400" },
    { id: 2, title: "How to Stay Motivated While Learning Online", excerpt: "Practical tips for maintaining focus and achieving your learning goals.", author: "Alex Rivera", date: "Mar 10, 2026", image: "https://picsum.photos/seed/blog2/800/400" },
    { id: 3, title: "Mastering UI/UX: A Beginner's Guide", excerpt: "Everything you need to know to start your journey as a designer.", author: "James Wilson", date: "Mar 05, 2026", image: "https://picsum.photos/seed/blog3/800/400" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">LMSPro Blog</h1>
        <p className="text-slate-500 max-w-2xl mx-auto">Insights, tutorials, and updates from our community of experts.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {posts.map((post) => (
          <article key={post.id} className="space-y-6 group cursor-pointer">
            <div className="aspect-[16/10] rounded-3xl overflow-hidden border border-slate-200">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs font-bold text-indigo-600 uppercase tracking-wider">
                <span>{post.author}</span>
                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                <span className="text-slate-400">{post.date}</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{post.title}</h2>
              <p className="text-slate-500 leading-relaxed line-clamp-3">{post.excerpt}</p>
              <button className="text-sm font-bold text-slate-900 flex items-center group-hover:translate-x-2 transition-transform">
                Read More <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

const CartPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-10">
      <h1 className="text-3xl font-bold text-slate-900">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {[
            { id: 1, title: "Full Stack Web Development with React & Node", instructor: "Dr. Sarah Smith", price: 89.99, thumbnail: "https://picsum.photos/seed/web/800/450" },
            { id: 2, title: "Mastering UI/UX Design Principles", instructor: "Alex Rivera", price: 59.99, thumbnail: "https://picsum.photos/seed/design/800/450" },
          ].map((item) => (
            <div key={item.id} className="flex gap-6 p-4 bg-white rounded-2xl border border-slate-200">
              <div className="w-32 aspect-video rounded-xl overflow-hidden flex-shrink-0">
                <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1 flex justify-between">
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-500">By {item.instructor}</p>
                  <button className="text-xs font-bold text-red-600 hover:underline mt-2">Remove</button>
                </div>
                <div className="text-xl font-bold text-slate-900">${item.price}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Order Summary</h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Original Price</span>
                <span>$149.98</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Discounts</span>
                <span className="text-green-600">-$20.00</span>
              </div>
              <div className="pt-4 border-t border-slate-100 flex justify-between text-xl font-bold text-slate-900">
                <span>Total</span>
                <span>$129.98</span>
              </div>
            </div>
            <button className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
              Checkout
            </button>
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
              <CreditCard className="w-4 h-4" /> Secure Payment Guaranteed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const Dashboard = () => {
  const { user } = useAuth();
  
  if (user?.role === 'INSTRUCTOR') return <InstructorDashboard />;
  if (user?.role === 'ADMIN') return <AdminDashboard />;
  return <StudentDashboard />;
};

const StudentDashboard = () => {
  const enrolledCourses: Course[] = [
    { id: 1, title: "Full Stack Web Development with React & Node", instructor: "Dr. Sarah Smith", price: 0, rating: 4.8, reviews: 1240, thumbnail: "https://picsum.photos/seed/web/800/450", category: "Development", enrolled: 5000, progress: 65 },
    { id: 2, title: "Mastering UI/UX Design Principles", instructor: "Alex Rivera", price: 0, rating: 4.9, reviews: 850, thumbnail: "https://picsum.photos/seed/design/800/450", category: "Design", enrolled: 3200, progress: 30 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Welcome back, Student!</h1>
          <p className="text-slate-500">You have completed 65% of your current course.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center space-x-3">
            <Award className="text-indigo-600 w-5 h-5" />
            <div>
              <div className="text-xs text-slate-500 font-medium">Certificates</div>
              <div className="text-sm font-bold">12 Earned</div>
            </div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center space-x-3">
            <TrendingUp className="text-green-600 w-5 h-5" />
            <div>
              <div className="text-xs text-slate-500 font-medium">Study Hours</div>
              <div className="text-sm font-bold">48h This Week</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-slate-900">Continue Learning</h2>
          <div className="space-y-4">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row gap-6 hover:shadow-lg transition-shadow">
                <div className="w-full sm:w-48 aspect-video rounded-xl overflow-hidden flex-shrink-0">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 space-y-4">
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{course.category}</div>
                    <h3 className="font-bold text-slate-900">{course.title}</h3>
                    <p className="text-xs text-slate-500">Instructor: {typeof course.instructor === 'object' ? course.instructor.name : course.instructor}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-600">Progress</span>
                      <span className="text-indigo-600">{course.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        className="h-full bg-indigo-600 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                  <Link to={`/learn/${course.id}`} className="inline-flex items-center text-sm font-bold text-indigo-600 hover:text-indigo-700">
                    Continue Lesson <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900">Upcoming Tasks</h2>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6">
            {[
              { title: "Quiz: React Hooks", time: "Today, 2:00 PM", type: "Quiz" },
              { title: "Assignment: Portfolio", time: "Tomorrow, 11:59 PM", type: "Assignment" },
              { title: "Live Session: Q&A", time: "Friday, 10:00 AM", type: "Live" },
            ].map((task, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className={`w-2 h-2 rounded-full mt-2 ${i === 0 ? 'bg-amber-500' : 'bg-slate-300'}`}></div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{task.title}</div>
                  <div className="text-xs text-slate-500">{task.time}</div>
                  <div className="mt-1 inline-block px-2 py-0.5 bg-slate-100 rounded text-[10px] font-bold text-slate-600">{task.type}</div>
                </div>
              </div>
            ))}
            <button className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-sm font-bold hover:border-indigo-300 hover:text-indigo-400 transition-colors">
              View Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InstructorDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Instructor Dashboard</h1>
          <p className="text-slate-500">Manage your courses and track your earnings.</p>
        </div>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex items-center hover:bg-indigo-700 transition-colors">
          <Plus className="w-5 h-5 mr-2" /> Create New Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Revenue", value: "$12,450.00", icon: DollarSign, color: "text-green-600", bg: "bg-green-50" },
          { label: "Total Students", value: "1,240", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Course Rating", value: "4.8/5", icon: Star, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Active Courses", value: "8", icon: BookOpen, color: "text-indigo-600", bg: "bg-indigo-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-900">Your Courses</h2>
            <button className="text-indigo-600 text-sm font-bold hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-4 font-bold text-slate-500 text-sm">Course Name</th>
                  <th className="pb-4 font-bold text-slate-500 text-sm">Students</th>
                  <th className="pb-4 font-bold text-slate-500 text-sm">Revenue</th>
                  <th className="pb-4 font-bold text-slate-500 text-sm">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { name: "React for Beginners", students: 450, revenue: "$4,500", status: "Published" },
                  { name: "Advanced Node.js", students: 210, revenue: "$3,150", status: "Published" },
                  { name: "UI Design Masterclass", students: 0, revenue: "$0", status: "Draft" },
                ].map((course, i) => (
                  <tr key={i} className="group hover:bg-slate-50 transition-colors">
                    <td className="py-4 font-bold text-slate-900">{course.name}</td>
                    <td className="py-4 text-slate-600">{course.students}</td>
                    <td className="py-4 text-slate-900 font-medium">{course.revenue}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${course.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                        {course.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6">
          <h2 className="text-xl font-bold text-slate-900">Recent Reviews</h2>
          <div className="space-y-6">
            {[
              { user: "John Doe", rating: 5, comment: "Amazing course! Really helped me understand React.", course: "React for Beginners" },
              { user: "Jane Smith", rating: 4, comment: "Good content, but some parts were a bit fast.", course: "Advanced Node.js" },
            ].map((review, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900 text-sm">{review.user}</span>
                  <div className="flex text-amber-400">
                    {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                  </div>
                </div>
                <p className="text-xs text-slate-500 italic">"{review.comment}"</p>
                <div className="text-[10px] font-bold text-indigo-600 uppercase">{review.course}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <h1 className="text-3xl font-bold text-slate-900">Admin Control Panel</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-6">
          <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center">
            <Users className="text-indigo-600 w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">User Management</h2>
            <p className="text-slate-500 text-sm">Manage students, instructors, and staff accounts.</p>
          </div>
          <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors">
            Manage Users
          </button>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-6">
          <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center">
            <BookOpen className="text-amber-600 w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">Course Review</h2>
            <p className="text-slate-500 text-sm">Approve or reject new course submissions.</p>
          </div>
          <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors">
            Review Courses (5 Pending)
          </button>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-6">
          <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center">
            <BarChart3 className="text-green-600 w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">Platform Analytics</h2>
            <p className="text-slate-500 text-sm">View detailed reports on revenue and growth.</p>
          </div>
          <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors">
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
};

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      if (response.ok) {
        const data = await response.json();
        const role: Role = email.includes('admin') ? 'ADMIN' : email.includes('instructor') ? 'INSTRUCTOR' : 'STUDENT';
        login(email, role);
        navigate('/dashboard');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      console.error("Login error:", err);
      // Fallback for demo if backend is not ready
      const role: Role = email.includes('admin') ? 'ADMIN' : email.includes('instructor') ? 'INSTRUCTOR' : 'STUDENT';
      login(email, role);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 bg-slate-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white p-8 rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 space-y-8"
      >
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-slate-500">Log in to your account to continue learning.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
            />
            <p className="text-[10px] text-slate-400 font-medium">Tip: Use 'admin@test.com' or 'instructor@test.com' to see different roles.</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-bold text-slate-700">Password</label>
              <button type="button" className="text-xs font-bold text-indigo-600 hover:underline">Forgot?</button>
            </div>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
            />
          </div>
          <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
            Log In
          </button>
        </form>

        <div className="text-center text-sm text-slate-500">
          Don't have an account? <Link to="/register" className="text-indigo-600 font-bold hover:underline">Sign up for free</Link>
        </div>
      </motion.div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('lms_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = (email: string, role: Role) => {
    const newUser = { id: 1, name: email.split('@')[0], email, role };
    setUser(newUser);
    localStorage.setItem('lms_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lms_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/courses" element={<CourseCatalog />} />
              <Route path="/course/:id" element={<CourseDetails />} />
              <Route path="/learn/:id" element={<CoursePlayer />} />
              <Route path="/certificate/:id" element={<CertificatePreview />} />
              <Route path="/builder/:id" element={<CurriculumBuilder />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <footer className="bg-slate-900 py-12 text-slate-400 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="col-span-2 space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                      <BookOpen className="text-white w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">LMS<span className="text-indigo-600">Pro</span></span>
                  </div>
                  <p className="max-w-xs text-sm">
                    Empowering learners worldwide with expert-led courses and a supportive community.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-bold">Platform</h4>
                  <ul className="space-y-2 text-sm">
                    <li><Link to="/courses" className="hover:text-white">Browse Courses</Link></li>
                    <li><Link to="/instructors" className="hover:text-white">Become an Instructor</Link></li>
                    <li><Link to="/pricing" className="hover:text-white">Pricing Plans</Link></li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-bold">Support</h4>
                  <ul className="space-y-2 text-sm">
                    <li><Link to="/help" className="hover:text-white">Help Center</Link></li>
                    <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
                    <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                  </ul>
                </div>
              </div>
              <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs">
                © 2026 LMSPro Demo. Built for interview showcase purposes.
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}
