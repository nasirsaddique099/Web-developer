document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const createMobileMenu = () => {
    const header = document.querySelector('.site-header');
    const nav = document.querySelector('.main-nav');
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<span></span><span></span><span></span>';
    mobileMenuBtn.setAttribute('aria-label', 'Toggle menu');
    
    // Insert button before nav
    header.insertBefore(mobileMenuBtn, nav);
    
    // Toggle menu on click
    mobileMenuBtn.addEventListener('click', function() {
      this.classList.toggle('active');
      nav.classList.toggle('active');
    });
  };
  
  // Only create mobile menu if screen width is less than 768px
  if (window.innerWidth < 768) {
    createMobileMenu();
  }
  
  // Handle window resize
  let mobileMenuCreated = window.innerWidth < 768;
  window.addEventListener('resize', function() {
    if (window.innerWidth < 768 && !mobileMenuCreated) {
      createMobileMenu();
      mobileMenuCreated = true;
    }
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return; // Skip if href is just #
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for fixed header
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Newsletter form submission
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      
      if (email) {
        // Simulate form submission
        const button = this.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Subscribing...';
        button.disabled = true;
        
        // Simulate API call with timeout
        setTimeout(() => {
          // Show success message
          const successMessage = document.createElement('p');
          successMessage.className = 'success-message';
          successMessage.textContent = 'Thank you for subscribing!';
          successMessage.style.color = '#0066cc';
          successMessage.style.marginTop = '10px';
          
          // Reset form
          emailInput.value = '';
          button.textContent = originalText;
          button.disabled = false;
          
          // Add success message
          this.appendChild(successMessage);
          
          // Remove success message after 3 seconds
          setTimeout(() => {
            successMessage.remove();
          }, 3000);
        }, 1500);
      }
    });
  }
  
  // Add lazy loading to images
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.setAttribute('loading', 'lazy');
    });
  } else {
    // Fallback for browsers that don't support lazy loading
    // You could add a lazy loading library here
  }
  
  // Add scroll to top button
  const createScrollTopButton = () => {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-top-btn';
    scrollBtn.innerHTML = '&uarr;';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    });
    
    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Add styles for the button
    const style = document.createElement('style');
    style.textContent = `
      .scroll-top-btn {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        background-color: #0066cc;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s, visibility 0.3s;
        z-index: 99;
      }
      .scroll-top-btn.visible {
        opacity: 1;
        visibility: visible;
      }
      .scroll-top-btn:hover {
        background-color: #004080;
      }
      @media (max-width: 767px) {
        .mobile-menu-btn {
          display: block;
          background: none;
          border: none;
          width: 30px;
          height: 20px;
          position: relative;
          cursor: pointer;
          z-index: 10;
        }
        .mobile-menu-btn span {
          display: block;
          width: 100%;
          height: 2px;
          background-color: #333;
          position: absolute;
          left: 0;
          transition: all 0.3s ease;
        }
        .mobile-menu-btn span:nth-child(1) {
          top: 0;
        }
        .mobile-menu-btn span:nth-child(2) {
          top: 9px;
        }
        .mobile-menu-btn span:nth-child(3) {
          top: 18px;
        }
        .mobile-menu-btn.active span:nth-child(1) {
          transform: rotate(45deg);
          top: 9px;
        }
        .mobile-menu-btn.active span:nth-child(2) {
          opacity: 0;
        }
        .mobile-menu-btn.active span:nth-child(3) {
          transform: rotate(-45deg);
          top: 9px;
        }
        .main-nav {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background-color: white;
          padding-top: 80px;
          transform: translateX(-100%);
          transition: transform 0.3s ease;
          z-index: 5;
        }
        .main-nav.active {
          transform: translateX(0);
        }
        .main-nav ul {
          flex-direction: column;
          align-items: center;
        }
        .main-nav li {
          margin: 15px 0;
        }
      }
    `;
    document.head.appendChild(style);
  };
  
  createScrollTopButton();
  
  // Add animation to post cards on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.post-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
      observer.observe(element);
    });
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
      .post-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
      .post-card.animate {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);
  };
  
  // Check if IntersectionObserver is supported
  if ('IntersectionObserver' in window) {
    animateOnScroll();
  }
  
  // Add a simple post filter functionality
  const setupCategoryFilter = () => {
    const categories = document.querySelectorAll('.post-category');
    const uniqueCategories = new Set();
    
    // Collect all unique categories
    categories.forEach(category => {
      uniqueCategories.add(category.textContent);
    });
    
    // Create filter buttons if we have categories
    if (uniqueCategories.size > 0) {
      const recentPostsSection = document.querySelector('.recent-posts');
      if (recentPostsSection) {
        const filterContainer = document.createElement('div');
        filterContainer.className = 'category-filter';
        
        // Add 'All' button
        const allButton = document.createElement('button');
        allButton.textContent = 'All';
        allButton.className = 'filter-btn active';
        allButton.setAttribute('data-category', 'all');
        filterContainer.appendChild(allButton);
        
        // Add category buttons
        uniqueCategories.forEach(category => {
          const button = document.createElement('button');
          button.textContent = category;
          button.className = 'filter-btn';
          button.setAttribute('data-category', category);
          filterContainer.appendChild(button);
        });
        
        // Insert filter before the first post card
        const sectionTitle = recentPostsSection.querySelector('.section-title');
        recentPostsSection.insertBefore(filterContainer, sectionTitle.nextSibling);
        
        // Add filter functionality
        const filterButtons = document.querySelectorAll('.filter-btn');
        const postCards = document.querySelectorAll('.recent-posts .post-card');
        
        filterButtons.forEach(button => {
          button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const selectedCategory = this.getAttribute('data-category');
            
            // Filter posts
            postCards.forEach(card => {
              const cardCategory = card.querySelector('.post-category').textContent;
              
              if (selectedCategory === 'all' || selectedCategory === cardCategory) {
                card.style.display = 'block';
              } else {
                card.style.display = 'none';
              }
            });
          });
        });
        
        // Add filter styles
        const style = document.createElement('style');
        style.textContent = `
          .category-filter {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 30px;
          }
          .filter-btn {
            background-color: #f0f0f0;
            border: none;
            padding: 8px 15px;
            border-radius: 20px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: all 0.3s ease;
          }
          .filter-btn:hover {
            background-color: #e0e0e0;
          }
          .filter-btn.active {
            background-color: #0066cc;
            color: white;
          }
        `;
        document.head.appendChild(style);
      }
    }
  };
  
  setupCategoryFilter();
});