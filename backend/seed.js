require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Import all models
const Admin = require('./models/Admin');
const About = require('./models/About');
const Award = require('./models/Award');
const Celebrity = require('./models/Celebrity');
const Contact = require('./models/Contact');
const Course = require('./models/Course');
const Gallery = require('./models/Gallery');
const Production = require('./models/Production');
const Service = require('./models/Service');
const Stat = require('./models/Stat');
const Testimonial = require('./models/Testimonial');

// Database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pfcfilms';

// Seed data
const seedData = {
  admin: [
    {
      username: 'admin',
      email: 'admin@pfcfilms.com',
      password: 'admin123',
      role: 'admin'
    }
  ],
  about: [
    {
      directorName: 'Mr. Pramod Kumar Gupta',
      directorTitle: 'Founder & Creative Director',
      directorImage: '/uploads/images/director.jpg',
      directorBio: 'A visionary filmmaker and mentor with over 15 years of experience in the Indian film industry. Pramod Kumar Gupta has directed numerous award-winning films and has been instrumental in nurturing young talent in Kanpur.',
      quote: 'Cinema is not just entertainment; it\'s a medium to inspire, educate, and transform lives.',
      vision: 'To become the premier destination for film education and dance training in North India, creating world-class artists and filmmakers who contribute to the global entertainment industry.',
      mission: 'To provide accessible, high-quality education in filmmaking and performing arts, empowering students to achieve their creative dreams while maintaining the rich cultural heritage of Indian cinema and dance.',
      achievements: [
        { icon: 'Film', number: '50+', label: 'Films Produced' },
        { icon: 'Award', number: '25+', label: 'Awards Won' },
        { icon: 'Users', number: '500+', label: 'Students Trained' },
        { icon: 'Star', number: '15+', label: 'Years Experience' }
      ]
    }
  ],
  services: [
    {
      title: 'Film Production',
      description: 'Feature films, short films, and commercial projects with cutting-edge technology',
      icon: 'Film',
      order: 0,
      featured: true
    },
    {
      title: 'Cinematography',
      description: 'Professional cinematography services for all your visual storytelling needs',
      icon: 'Camera',
      order: 1,
      featured: true
    },
    {
      title: 'Dance Academy',
      description: 'Professional training in classical, contemporary, and modern dance forms',
      icon: 'Music',
      order: 2,
      featured: true
    },
    {
      title: 'Acting School',
      description: 'Comprehensive acting courses covering method acting, voice modulation, and camera techniques',
      icon: 'Drama',
      order: 3,
      featured: true
    }
  ],
  stats: [
    { number: '50+', label: 'Projects Completed', icon: 'Film', order: 0 },
    { number: '500+', label: 'Students Trained', icon: 'Users', order: 1 },
    { number: '25+', label: 'Awards Won', icon: 'Award', order: 2 },
    { number: '15+', label: 'Years Experience', icon: 'Star', order: 3 }
  ],
  productions: [
    {
      title: 'Echoes of Silence',
      category: 'Feature Films',
      year: '2024',
      image: '/uploads/images/production-1.jpg',
      description: 'A powerful drama exploring the untold stories of rural India, showcasing exceptional cinematography and storytelling.',
      duration: '120 min',
      genre: 'Drama',
      status: 'Released',
      awards: 'Best Cinematography - National Film Awards',
      featured: true,
      order: 0
    },
    {
      title: 'Beyond Horizons',
      category: 'Feature Films',
      year: '2023',
      image: '/uploads/images/production-2.jpg',
      description: 'An inspiring tale of dreams and determination set against the backdrop of modern India.',
      duration: '135 min',
      genre: 'Inspirational Drama',
      status: 'Released',
      awards: 'Best Director - Regional Film Awards',
      featured: true,
      order: 1
    },
    {
      title: 'Urban Stories',
      category: 'Documentaries',
      year: '2024',
      image: '/uploads/images/production-3.jpg',
      description: 'A compelling documentary series exploring the lives and challenges of urban youth in India.',
      duration: '45 min',
      genre: 'Documentary',
      status: 'Released',
      featured: true,
      order: 2
    },
    {
      title: 'Rhythm of Life',
      category: 'Music Videos',
      year: '2024',
      image: '/uploads/images/production-4.jpg',
      description: 'A vibrant music video celebrating Indian culture and dance traditions.',
      duration: '4:30',
      genre: 'Music Video',
      status: 'Released',
      featured: false,
      order: 3
    },
    {
      title: 'The Journey',
      category: 'Short Films',
      year: '2023',
      image: '/uploads/images/production-5.jpg',
      description: 'A touching short film about a young dancer\'s journey to success.',
      duration: '15 min',
      genre: 'Drama',
      status: 'Released',
      featured: false,
      order: 4
    },
    {
      title: 'Brand Excellence',
      category: 'Commercials',
      year: '2024',
      image: '/uploads/images/production-6.jpg',
      description: 'High-quality commercial production for leading brands.',
      duration: '30 sec',
      genre: 'Commercial',
      status: 'Released',
      featured: false,
      order: 5
    }
  ],
  courses: [
    {
      title: 'Film Direction Masterclass',
      level: 'Advanced',
      duration: '6 Months',
      students: '50+',
      rating: '4.8',
      price: '₹25,000',
      image: '/uploads/images/course-1.jpg',
      description: 'Comprehensive film direction course covering script analysis, shot composition, and post-production supervision.',
      modules: [
        'Script Analysis & Storytelling',
        'Visual Composition & Cinematography',
        'Directing Actors',
        'Post-Production & Editing',
        'Film Distribution & Marketing'
      ],
      academy: 'Film Academy',
      featured: true,
      order: 0
    },
    {
      title: 'Acting for Camera',
      level: 'Beginner to Advanced',
      duration: '4 Months',
      students: '100+',
      rating: '4.9',
      price: '₹18,000',
      image: '/uploads/images/course-2.jpg',
      description: 'Learn method acting, voice modulation, and camera-facing techniques from industry professionals.',
      modules: [
        'Method Acting Fundamentals',
        'Voice & Speech Training',
        'Camera Techniques',
        'Character Development',
        'Audition Preparation'
      ],
      academy: 'Acting School',
      featured: true,
      order: 1
    },
    {
      title: 'Bollywood Dance Classes',
      level: 'Beginner to Advanced',
      duration: '3 Months',
      students: '200+',
      rating: '4.7',
      price: '₹8,000',
      image: '/uploads/images/course-3.jpg',
      description: 'Master Bollywood dance moves, choreography, and performance skills.',
      modules: [
        'Basic Bollywood Steps',
        'Choreography Techniques',
        'Performance Skills',
        'Stage Presence',
        'Dance Routines'
      ],
      academy: 'Dance Academy',
      featured: true,
      order: 2
    },
    {
      title: 'Classical Dance Training',
      level: 'Beginner to Advanced',
      duration: '6 Months',
      students: '80+',
      rating: '4.9',
      price: '₹12,000',
      image: '/uploads/images/course-4.jpg',
      description: 'Learn traditional Indian classical dance forms including Kathak and Bharatanatyam.',
      modules: [
        'Basic Postures & Mudras',
        'Classical Dance Forms',
        'Rhythm & Music',
        'Traditional Choreography',
        'Performance & Recitals'
      ],
      academy: 'Dance Academy',
      featured: true,
      order: 3
    },
    {
      title: 'Cinematography Course',
      level: 'Intermediate',
      duration: '6 Months',
      students: '40+',
      rating: '4.8',
      price: '₹30,000',
      image: '/uploads/images/course-5.jpg',
      description: 'Professional cinematography training covering lighting, camera operation, and visual storytelling.',
      modules: [
        'Camera Operation & Settings',
        'Lighting Techniques',
        'Composition & Framing',
        'Color Grading',
        'Equipment & Technology'
      ],
      academy: 'Film Academy',
      featured: false,
      order: 4
    },
    {
      title: 'Hip Hop Dance Classes',
      level: 'Beginner to Advanced',
      duration: '3 Months',
      students: '150+',
      rating: '4.6',
      price: '₹7,500',
      image: '/uploads/images/course-6.jpg',
      description: 'Learn hip hop dance styles, freestyle, and urban dance techniques.',
      modules: [
        'Hip Hop Fundamentals',
        'Breaking & Popping',
        'Freestyle Techniques',
        'Choreography',
        'Battle & Competition Prep'
      ],
      academy: 'Dance Academy',
      featured: false,
      order: 5
    }
  ],
  gallery: [
    {
      title: 'Behind the Scenes - Echoes of Silence',
      category: 'Production',
      type: 'photo',
      image: '/uploads/images/gallery-1.jpg',
      featured: true,
      order: 0
    },
    {
      title: 'Film Direction Workshop',
      category: 'Academy',
      type: 'photo',
      image: '/uploads/images/gallery-2.jpg',
      featured: true,
      order: 1
    },
    {
      title: 'Cinematography Training Session',
      category: 'Academy',
      type: 'photo',
      image: '/uploads/images/gallery-3.jpg',
      featured: false,
      order: 2
    },
    {
      title: 'Award Ceremony 2024',
      category: 'Events',
      type: 'photo',
      image: '/uploads/images/gallery-4.jpg',
      featured: true,
      order: 3
    },
    {
      title: 'Dance Performance - Annual Day',
      category: 'Events',
      type: 'photo',
      image: '/uploads/images/gallery-5.jpg',
      featured: false,
      order: 4
    },
    {
      title: 'Echoes of Silence - Official Trailer',
      category: 'Trailers',
      type: 'video',
      image: '/uploads/images/gallery-video-1.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=example1',
      duration: '2:30',
      featured: true,
      order: 5
    },
    {
      title: 'Film Direction Course Overview',
      category: 'Academy',
      type: 'video',
      image: '/uploads/images/gallery-video-2.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=example2',
      duration: '5:45',
      featured: false,
      order: 6
    },
    {
      title: 'Behind the Scenes Montage',
      category: 'BTS',
      type: 'video',
      image: '/uploads/images/gallery-video-3.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=example3',
      duration: '8:20',
      featured: true,
      order: 7
    }
  ],
  celebrities: [
    {
      name: 'Rajesh Kumar',
      image: '/uploads/images/celebrity-1.jpg',
      role: 'Lead Actor',
      bio: 'Award-winning actor known for his versatile performances in regional cinema.',
      gallery: [
        '/uploads/images/celebrity-1-gallery-1.jpg',
        '/uploads/images/celebrity-1-gallery-2.jpg'
      ],
      featured: true,
      order: 0
    },
    {
      name: 'Priya Sharma',
      image: '/uploads/images/celebrity-2.jpg',
      role: 'Dance Choreographer',
      bio: 'Renowned choreographer specializing in Bollywood and classical dance forms.',
      gallery: [
        '/uploads/images/celebrity-2-gallery-1.jpg',
        '/uploads/images/celebrity-2-gallery-2.jpg'
      ],
      featured: true,
      order: 1
    },
    {
      name: 'Amit Verma',
      image: '/uploads/images/celebrity-3.jpg',
      role: 'Cinematographer',
      bio: 'Expert cinematographer with multiple award-winning projects to his credit.',
      gallery: [
        '/uploads/images/celebrity-3-gallery-1.jpg'
      ],
      featured: true,
      order: 2
    },
    {
      name: 'Sneha Patel',
      image: '/uploads/images/celebrity-4.jpg',
      role: 'Acting Coach',
      bio: 'Experienced acting coach who has trained numerous successful actors.',
      gallery: [],
      featured: false,
      order: 3
    }
  ],
  testimonials: [
    {
      name: 'Rahul Singh',
      course: 'Film Direction Masterclass',
      image: '/uploads/images/testimonial-1.jpg',
      text: 'The Film Direction course at PFC Films transformed my understanding of cinema. The practical approach and industry insights were invaluable.',
      rating: 5,
      featured: true,
      order: 0
    },
    {
      name: 'Anjali Mishra',
      course: 'Bollywood Dance Classes',
      image: '/uploads/images/testimonial-2.jpg',
      text: 'Amazing dance academy! The instructors are professional and patient. I\'ve improved so much in just 3 months.',
      rating: 5,
      featured: true,
      order: 1
    },
    {
      name: 'Vikram Das',
      course: 'Acting for Camera',
      image: '/uploads/images/testimonial-3.jpg',
      text: 'Best acting school in Kanpur! The course structure is comprehensive and the faculty is excellent. Highly recommended!',
      rating: 5,
      featured: true,
      order: 2
    },
    {
      name: 'Meera Joshi',
      course: 'Classical Dance Training',
      image: '/uploads/images/testimonial-4.jpg',
      text: 'I\'ve been learning classical dance here for 6 months. The training is authentic and the teachers are masters of their craft.',
      rating: 5,
      featured: false,
      order: 3
    },
    {
      name: 'Arjun Mehta',
      course: 'Cinematography Course',
      image: '/uploads/images/testimonial-5.jpg',
      text: 'The cinematography course exceeded my expectations. Hands-on training with professional equipment made all the difference.',
      rating: 4,
      featured: false,
      order: 4
    }
  ],
  awards: [
    {
      title: 'Best Cinematography',
      year: '2024',
      category: 'Technical Excellence',
      project: 'Echoes of Silence',
      image: '/uploads/images/award-1.jpg',
      description: 'Awarded for outstanding cinematography in feature film category',
      featured: true,
      order: 0
    },
    {
      title: 'Best Director',
      year: '2023',
      category: 'Direction',
      project: 'Beyond Horizons',
      image: '/uploads/images/award-2.jpg',
      description: 'Recognition for exceptional direction and storytelling',
      featured: true,
      order: 1
    },
    {
      title: 'Best Documentary',
      year: '2024',
      category: 'Documentary',
      project: 'Urban Stories',
      image: '/uploads/images/award-3.jpg',
      description: 'Award for best documentary film of the year',
      featured: true,
      order: 2
    },
    {
      title: 'Excellence in Education',
      year: '2023',
      category: 'Education',
      project: 'Film Academy',
      image: '/uploads/images/award-4.jpg',
      description: 'Recognition for outstanding contribution to film education',
      featured: false,
      order: 3
    }
  ]
};

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data (optional - comment out if you want to keep existing data)
    const clearData = process.argv.includes('--clear');
    if (clearData) {
      console.log('🗑️  Clearing existing data...');
      await Admin.deleteMany({});
      await About.deleteMany({});
      await Award.deleteMany({});
      await Celebrity.deleteMany({});
      await Contact.deleteMany({});
      await Course.deleteMany({});
      await Gallery.deleteMany({});
      await Production.deleteMany({});
      await Service.deleteMany({});
      await Stat.deleteMany({});
      await Testimonial.deleteMany({});
      console.log('✅ Existing data cleared');
    }

    // Seed Admin
    console.log('🌱 Seeding Admin...');
    for (const adminData of seedData.admin) {
      const existingAdmin = await Admin.findOne({ email: adminData.email });
      if (!existingAdmin) {
        const admin = new Admin(adminData);
        await admin.save();
        console.log(`   ✓ Created admin: ${adminData.username}`);
      } else {
        console.log(`   ⊘ Admin already exists: ${adminData.username}`);
      }
    }

    // Seed About
    console.log('🌱 Seeding About...');
    const existingAbout = await About.findOne();
    if (!existingAbout) {
      await About.create(seedData.about);
      console.log('   ✓ Created about content');
    } else {
      console.log('   ⊘ About content already exists');
    }

    // Seed Services
    console.log('🌱 Seeding Services...');
    await Service.insertMany(seedData.services);
    console.log(`   ✓ Created ${seedData.services.length} services`);

    // Seed Stats
    console.log('🌱 Seeding Stats...');
    await Stat.insertMany(seedData.stats);
    console.log(`   ✓ Created ${seedData.stats.length} stats`);

    // Seed Productions
    console.log('🌱 Seeding Productions...');
    await Production.insertMany(seedData.productions);
    console.log(`   ✓ Created ${seedData.productions.length} productions`);

    // Seed Courses
    console.log('🌱 Seeding Courses...');
    await Course.insertMany(seedData.courses);
    console.log(`   ✓ Created ${seedData.courses.length} courses`);

    // Seed Gallery
    console.log('🌱 Seeding Gallery...');
    await Gallery.insertMany(seedData.gallery);
    console.log(`   ✓ Created ${seedData.gallery.length} gallery items`);

    // Seed Celebrities
    console.log('🌱 Seeding Celebrities...');
    await Celebrity.insertMany(seedData.celebrities);
    console.log(`   ✓ Created ${seedData.celebrities.length} celebrities`);

    // Seed Testimonials
    console.log('🌱 Seeding Testimonials...');
    await Testimonial.insertMany(seedData.testimonials);
    console.log(`   ✓ Created ${seedData.testimonials.length} testimonials`);

    // Seed Awards
    console.log('🌱 Seeding Awards...');
    await Award.insertMany(seedData.awards);
    console.log(`   ✓ Created ${seedData.awards.length} awards`);

    console.log('\n✅ Database seeding completed successfully!');
    console.log('\n📝 Default Admin Credentials:');
    console.log('   Username: admin');
    console.log('   Email: admin@pfcfilms.com');
    console.log('   Password: admin123');
    console.log('\n⚠️  Please change the default password after first login!');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
    process.exit(0);
  }
}

// Run the seed function
seedDatabase();
