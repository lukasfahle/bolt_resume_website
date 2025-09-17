import React, { useState, useEffect, useRef } from 'react';
import { Mail, Calendar, X, Download, UserPlus } from 'lucide-react';

// Add styles at the top of the file
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

  body {
    font-family: 'Inter', sans-serif;
  }

  .shiny-text {
    color: #374151; /* text-gray-700 */
    background: linear-gradient(
      120deg,
      #374151 40%,
      #ffffff 50%,
      #374151 60%
    );
    background-size: 200% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    display: inline-block;
    animation: shine 3s linear infinite;
    -webkit-text-fill-color: transparent;
  }

  @keyframes shine {
    0% {
      background-position: 200%;
    }
    100% {
      background-position: -200%;
    }
  }

  .shiny-text.disabled {
    animation: none;
  }
`;

type Category = 'Role' | 'Project' | 'Degree/Certification' | 'Thought';
type Tag = 'Industry' | 'Academia' | 'Private';

interface Entry {
  id: number;
  title: string;
  type: string; // secondary label (e.g., organization, role)
  date: string;
  category: Category;
  tags: Tag[];
  image: string;
  description?: string;
  // Only meaningful for Roles
  isCurrent?: boolean;
}

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [viewAll, setViewAll] = useState(false);
  const [allFilter, setAllFilter] = useState<'All' | Category>('All');
  const experienceRef = useRef<HTMLDivElement>(null);
  const currentRoleRef = useRef<HTMLDivElement>(null);

  const actionButtons = [
    {
      label: 'Download CV',
      href: '/cv.pdf',
      icon: Download,
      style:
        'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-black shadow-sm',
      download: true,
    },
    {
      label: 'Schedule meeting',
      href: 'https://calendar.app.google/qwtTxZU1SGSysZFP7',
      icon: Calendar,
      style:
        'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-black shadow-sm',
      external: true,
    },
    {
      label: 'Connect',
      href: 'https://www.linkedin.com/in/lukasfahle/',
      icon: UserPlus,
      style: 'bg-orange-800 text-white hover:bg-orange-700 shadow-md',
      external: true,
    },
  ] as const;

  const entries: Entry[] = [
    {
      id: 1,
      title: "Shaping Copper's Future in Business Development",
      type: "Rio Tinto",
      date: "May 21, 2024",
      category: 'Role',
      tags: ['Industry'],
      description: "Leading development of scalable web applications using React, Node.js, and cloud technologies. Mentoring junior developers and architecting solutions for enterprise clients. Responsible for technical decision-making, code reviews, and establishing best practices across multiple development teams. Successfully delivered 15+ projects with 99.9% uptime and improved system performance by 40%.",
      image: "/images/experience/bd.png",
      isCurrent: true
    },
    {
      id: 7,
      title: "Driving $14M Capex Approval For OBK",
      type: "Rio Tinto",
      date: "April 15, 2022",
      category: 'Role',
      tags: ['Industry'],
      description: "Led the successful approval of a $14M capital expenditure project for OBK, demonstrating strong project management and stakeholder engagement skills. Developed comprehensive business case and technical documentation, coordinated cross-functional teams, and presented to senior leadership.",
      image: "/images/experience/capex.png"
    },
    {
      id: 2,
      title: "Innovating Critical Minerals for Defense and Supply Security",
      type: "Rio Tinto",
      date: "March 15, 2022",
      category: 'Role',
      tags: ['Industry'],
      description: "Built responsive web applications and mobile-first designs using modern frameworks and best practices. Collaborated with design teams to implement pixel-perfect interfaces and optimized user experiences. Developed custom component libraries and maintained design systems for consistency across projects. Improved page load times by 60% through performance optimization techniques.",
      image: "/images/experience/rd.png"
    },
    {
      id: 3,
      title: "Empowering Slope Stability with Actionable Data",
      type: "Rio Tinto",
      date: "January 10, 2020",
      category: 'Role',
      tags: ['Industry'],
      description: "Designed user interfaces and experiences for web and mobile applications with focus on usability. Conducted user research, created wireframes, and prototyped interactive designs. Led design workshops and collaborated closely with development teams to ensure design feasibility. Increased user engagement by 35% through improved interface design and user flow optimization.",
      image: "/images/experience/geotech_op.png"
    },
    {
      id: 4,
      title: "Earning PhD Advancing LiDAR Analytics in Underground Mining",
      type: "Colorado School of Mines",
      date: "December 15, 2018",
      category: 'Degree/Certification',
      tags: ['Academia'],
      description: "Focused on software engineering, algorithms, and human-computer interaction. Graduated with honors.",
      image: "/images/education/mines.jpg"
    },
    {
      id: 5,
      title: "Enterprise E-commerce Platform",
      type: "Lead Developer",
      date: "August 30, 2023",
      category: 'Project',
      tags: ['Private'],
      description: "Led development of enterprise-scale e-commerce platform",
      image: "/images/projects/default.png"
    },
    {
      id: 6,
      title: "Payment Processing System",
      type: "System Architect",
      date: "November 15, 2023",
      category: 'Project',
      tags: ['Private'],
      description: "Architected microservices-based payment processing system",
      image: "/images/projects/default.png"
    }
  ];
  // Derivations by category
  const roles = entries.filter(entry => entry.category === 'Role');
  const currentRole = roles.find(entry => entry.isCurrent);
  const pastRoles = roles.filter(entry => !entry.isCurrent);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (selectedEntry) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedEntry]);

  const handleEntryClick = (entry: Entry) => {
    setSelectedEntry(entry);
  };

  const closeModal = () => {
    setSelectedEntry(null);
  };

  const isScrolled = scrollY > 120;

  return (
    <div className="min-h-screen bg-white text-black">
      <style>{styles}</style>
      {/* All Entries View */}
      {viewAll ? (
        <section className="px-6 py-16 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-start justify-between mb-6 gap-4">
              <h2 className="text-4xl font-light tracking-tight">All</h2>
              <button
                onClick={() => setViewAll(false)}
                className="text-sm text-[#777777] hover:text-black transition-colors duration-200"
              >
                Back
              </button>
            </div>

            {/* Basic Filters */}
            <div className="mb-10 flex flex-wrap items-center gap-2">
              {(['All', 'Role', 'Project', 'Degree/Certification', 'Thought'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setAllFilter(cat)}
                  className={
                    `px-3 py-1.5 rounded-full text-sm border transition-colors duration-200 ` +
                    (allFilter === cat
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-[#555] border-gray-200 hover:border-gray-300 hover:text-black')
                  }
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...entries]
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .filter(e => allFilter === 'All' || e.category === allFilter)
                .map((entry) => (
                <div key={entry.id} className="flex flex-row h-40 cursor-pointer" onClick={() => handleEntryClick(entry)}>
                  {/* 1:1 Image on the left */}
                  <div className="w-40 h-40 bg-gray-100 flex items-center justify-center overflow-hidden rounded-2xl">
                    {entry.image && (
                      <img src={entry.image} alt={entry.title} className="object-cover w-full h-full" />
                    )}
                  </div>
                  {/* Text on the right */}
                  <div className="flex-1 p-6 flex flex-col justify-center gap-1">
                    {/* Title */}
                    <h4 className="text-lg font-medium mb-1">{entry.title}</h4>
                    {/* Type and Date */}
                    <div className="flex items-center text-[#777777] text-sm">
                      <span>{entry.type}</span>
                      <span className="ml-2 text-[#777777] text-xs">{entry.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
      <>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Headshot */}
          <div className="relative max-w-[280px] mx-auto">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-2xl">
              <img
                src="/images/headshot/profile.jpg"
                alt="Professional headshot"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-8 text-center lg:text-left">
            <div>
              <h1 className="text-5xl lg:text-6xl font-light mb-4 tracking-tight">
                Lukas Fahle
              </h1>
              <p className="text-lg text-[#777777] leading-relaxed">
                I am a mining engineer with broad context from operations, academia, innovation and business development . From stabilizing slopes at one of the world's largest open-pit mines to developing data-driven solutions for critical mineral supply and national security, I bring technical depth and strategic insight to the challenges shaping the future of mining. Let's build what's next—safely, efficiently, and sustainably.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div
                className={`flex gap-4 justify-center lg:justify-start transition-all duration-500 ease-in-out ${
                  isScrolled
                    ? 'fixed right-4 top-1/2 z-50 -translate-y-1/2 flex-col gap-3'
                    : ''
                }`}
              >
                {actionButtons.map(({ label, href, icon: Icon, style, download, external }) => (
                  <a
                    key={label}
                    href={href}
                    {...(download ? { download: true } : {})}
                    {...(external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    aria-label={label}
                    title={label}
                    className={`group inline-flex items-center rounded-full text-sm font-medium transition-all duration-500 ease-in-out ${
                      isScrolled
                        ? 'h-12 w-12 justify-center px-0 py-0 shadow-lg'
                        : 'px-4 py-2'
                    } ${style}`}
                  >
                    <Icon
                      className={`h-4 w-4 transition-transform duration-500 ease-in-out ${
                        isScrolled ? 'scale-105' : 'scale-100'
                      }`}
                    />
                    <span
                      className={`ml-2 whitespace-nowrap transition-[opacity,transform,width] duration-300 ease-in-out ${
                        isScrolled
                          ? 'w-0 -translate-x-2 overflow-hidden opacity-0'
                          : 'w-auto translate-x-0 opacity-100'
                      }`}
                    >
                      {label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Role Section */}
      <section id="current-future-section" ref={experienceRef} className="relative px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Responsive grid: lg=side by side, md=stacked, sm=stacked */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Current Role - 16:9 image, always on top/left */}
            {currentRole && (
              <div
                ref={currentRoleRef}
                className={
                  // Only grid column span, no sticky here
                  'lg:col-span-2'
                }
              >
                {/* Sticky wrapper only on large screens */}
                <div className="space-y-6 lg:sticky lg:top-8">
                  <div
                    className="aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100 shadow-2xl cursor-pointer"
                    onClick={() => handleEntryClick(currentRole)}
                  >
                    <img
                      src={currentRole.image}
                      alt={currentRole.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-light tracking-tight">{currentRole.title}</h3>
                    <div className="flex items-center text-[#777777] text-sm">
                      <span>{currentRole.type}</span>
                      <span className="ml-2 text-[#777777] text-xs">{currentRole.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Right column: 1:1 images, responsive layout */}
            {/* On lg: vertical stack, on md: horizontal row, on sm: vertical stack */}
            <div
              className={
                // On large screens, stack vertically; on medium, row; on small, column
                'lg:col-span-1 flex flex-col gap-8 ' +
                'md:flex-row md:gap-4 md:mt-8 ' +
                'lg:flex-col lg:gap-8 lg:mt-0'
              }
            >
              {pastRoles.slice(0, 3).map((entry) => (
                <div
                  key={entry.id}
                  className={
                    // On md: flex-1 for even row distribution, on lg: normal
                    'space-y-4 md:space-y-2 flex-1'
                  }
                >
                  <div
                    className="aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-2xl cursor-pointer"
                    onClick={() => handleEntryClick(entry)}
                  >
                    <img
                      src={entry.image}
                      alt={entry.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="caption-wrap space-y-2">
                    <h3 className="text-xl font-light tracking-tight">{entry.title}</h3>
                    <div className="flex items-center text-[#777777] text-sm">
                      <span>{entry.type}</span>
                      <span className="ml-2 text-[#777777] text-xs">{entry.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Section */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-light mb-12 text-left tracking-tight">Recent</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {entries
              .slice(0, 6)
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((entry) => (
              <div key={entry.id} className="flex flex-row h-40 cursor-pointer" onClick={() => handleEntryClick(entry)}>
                {/* 1:1 Image on the left */}
                <div className="w-40 h-40 bg-gray-100 flex items-center justify-center overflow-hidden rounded-2xl">
                  {entry.image && (
                    <img src={entry.image} alt={entry.title} className="object-cover w-full h-full" />
                  )}
                </div>
                {/* Text on the right */}
                <div className="flex-1 p-6 flex flex-col justify-center gap-1">
                  {/* Title */}
                  <h4 className="text-lg font-medium mb-1">{entry.title}</h4>
                  {/* Type and Date */}
                  <div className="flex items-center text-[#777777] text-sm">
                    <span>{entry.type}</span>
                    <span className="ml-2 text-[#777777] text-xs">{entry.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-12">
            <button onClick={() => setViewAll(true)} className="text-sm text-[#777777] hover:text-black transition-colors duration-200">
              View all
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-white">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-[#777777]">
            <Mail size={18} />
            <span>Lukas@example.com</span>
          </div>
          <p className="text-[#777777]">
            © 2024 Lukas Fahle.
          </p>
        </div>
      </footer>
      </>
      )}

      {/* Modal Overlay */}
      {selectedEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={closeModal}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-black transition-colors duration-200"
            >
              <X size={24} />
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-orange-800 mb-2">
                <Calendar size={18} />
                <span className="text-sm">{selectedEntry.date}</span>
              </div>
              <h3 className="text-3xl font-light tracking-tight mb-2">{selectedEntry.title}</h3>
              <p className="text-xl text-orange-800 font-medium">{selectedEntry.type}</p>
            </div>

            {/* Modal Description */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-800">Description</h4>
              <p className="text-[#777777] leading-relaxed">{selectedEntry.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
