// components.js

// 1. Exact Original Navbar HTML (No top chat icon, original classes)
const navbarHTML = `
    <div class="container mx-auto px-6">
        <div class="flex justify-between items-center">
            <a href="index.html" class="relative z-50">
                <h1 id="nav-logo" class="text-3xl font-serif font-bold tracking-widest text-white transition-colors duration-300">BRAND.</h1>
            </a>
            
            <div id="nav-links" class="hidden md:flex gap-10 text-xs font-bold uppercase tracking-[0.2em] text-white/90 transition-colors duration-300">
                <a href="men.html" class="nav-item hover:opacity-75 transition-all hover:scale-105 cursor-pointer">Men</a>
                <a href="women.html" class="nav-item hover:opacity-75 transition-all hover:scale-105 cursor-pointer">Women</a>
                <a href="kids.html" class="nav-item hover:opacity-75 transition-all hover:scale-105 cursor-pointer">Kids</a>
            </div>

            <div id="nav-icons" class="flex items-center gap-6 relative z-50 text-white transition-colors duration-300">
                
                <div id="auth-container"></div>

                <div onclick="toggleCart()" class="relative cursor-pointer group">
                    <i class="fa-solid fa-bag-shopping text-xl group-hover:scale-110 transition"></i>
                    <span id="cart-count" class="absolute -top-2 -right-2 bg-themeText text-[#E6D8C5] text-[9px] rounded-full h-4 w-4 flex items-center justify-center font-bold border border-[#E6D8C5]">0</span>
                </div>
                
                <button onclick="toggleMobileMenu()" class="md:hidden text-xl focus:outline-none"><i class="fa-solid fa-bars-staggered"></i></button>
            </div>
        </div>
    </div>

    <!-- Mobile Menu Overlay (click to close) -->
    <div id="mobile-menu-overlay"
         style="
            position:fixed; inset:0;
            background: rgba(0,0,0,0.40);
            opacity:0; visibility:hidden; pointer-events:none;
            transition: opacity 250ms ease, visibility 250ms ease;
            z-index: 9998;
         "></div>

    <!-- Mobile Menu Panel (card-style slide-in like your reference site) -->
    <div id="mobile-menu"
         class="flex flex-col overflow-y-auto bg-[#E6D8C5] fixed z-[9999]"
         style="
            left: 12px;
            top: 80px;
            width: min(78vw, 330px);
            max-height: calc(100vh - 92px);
            border-radius: 18px;
            border: 1px solid rgba(0,0,0,0.10);
            box-shadow: 10px 10px 40px rgba(0,0,0,0.18);
            transform: translateX(-120%);
            transition: transform 280ms ease;
            -webkit-overflow-scrolling: touch;
         ">
        <div class="flex justify-between items-center mb-0 px-5 py-4 border-b border-themeText/10">
            <h2 class="text-sm font-serif font-bold tracking-widest uppercase">Menu</h2>
            <button onclick="toggleMobileMenu(false)" class="text-2xl p-2"><i class="fa-solid fa-xmark"></i></button>
        </div>
        
        <div class="flex flex-col px-4 py-2">
            <a href="men.html" class="block w-full py-4 px-2 text-[15px] font-bold text-themeText border-b border-themeText/10 hover:opacity-80 transition">Men</a>
            <a href="women.html" class="block w-full py-4 px-2 text-[15px] font-bold text-themeText border-b border-themeText/10 hover:opacity-80 transition">Women</a>
            <a href="kids.html" class="block w-full py-4 px-2 text-[15px] font-bold text-themeText hover:opacity-80 transition">Kids</a>
        </div>

        <div id="mobile-auth-links" class="mt-auto pt-6 pb-5 px-4 border-t border-themeText/10"></div>
    </div>
`;

// 2. Footer HTML
const footerHTML = `
    <div class="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div class="col-span-1 md:col-span-1">
            <h2 class="text-2xl font-serif font-bold tracking-widest mb-6 uppercase">BRAND.</h2>
            <p class="text-xs leading-relaxed text-[#A89F91]">Redefining luxury through sustainable practices and timeless design. Established 2025.</p>
        </div>
        <div>
            <h4 class="font-bold uppercase text-xs tracking-widest mb-6 text-white">Shop</h4>
            <ul class="space-y-3 text-xs text-[#A89F91]">
                <li><a href="men.html" class="hover:text-white transition">Men</a></li>
                <li><a href="women.html" class="hover:text-white transition">Women</a></li>
                <li><a href="kids.html" class="hover:text-white transition">Kids</a></li>
            </ul>
        </div>
        <div>
            <h4 class="font-bold uppercase text-xs tracking-widest mb-6 text-white">Support</h4>
            <ul class="space-y-3 text-xs text-[#A89F91]">
                <li><a href="orders.html" class="hover:text-white transition">Order Status</a></li>
                <li><a href="#" class="hover:text-white transition">Shipping & Returns</a></li>
                <li><a href="#" class="hover:text-white transition">FAQ</a></li>
            </ul>
        </div>
        <div>
            <h4 class="font-bold uppercase text-xs tracking-widest mb-6 text-white">Social</h4>
            <div class="flex gap-4 text-lg text-white">
                <a href="#" class="w-10 h-10 rounded-full border border-[#4A3B32] flex items-center justify-center hover:bg-[#E6D8C5] hover:text-[#2E241E] transition duration-300"><i class="fa-brands fa-instagram"></i></a>
                <a href="#" class="w-10 h-10 rounded-full border border-[#4A3B32] flex items-center justify-center hover:bg-[#E6D8C5] hover:text-[#2E241E] transition duration-300"><i class="fa-brands fa-tiktok"></i></a>
                <a href="#" class="w-10 h-10 rounded-full border border-[#4A3B32] flex items-center justify-center hover:bg-[#E6D8C5] hover:text-[#2E241E] transition duration-300"><i class="fa-brands fa-twitter"></i></a>
            </div>
        </div>
    </div>
    <div class="container mx-auto px-6 border-t border-[#4A3B32] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-[10px] text-[#A89F91] uppercase font-bold tracking-widest">&copy; 2025 Brand Inc. All rights reserved.</p>
        <div class="flex gap-4 text-[10px] text-[#A89F91] uppercase font-bold">
            <a href="#" class="hover:text-white transition">Privacy Policy</a>
            <a href="#" class="hover:text-white transition">Terms of Service</a>
        </div>
        <p class="text-[10px] text-[#A89F91] uppercase font-bold tracking-widest">Maintenance: Optimal Storage 18°C - 24°C</p>
    </div>
`;

// 3. Initialize Navbar
const navContainer = document.getElementById('app-navbar');
if (navContainer) {
    // Apply the wrapper classes that were originally on the <nav> tag
    navContainer.className = "fixed top-0 w-full z-50 transition-all duration-300 py-6 border-b border-transparent";
    navContainer.id = "navbar"; // Restore ID for scroll logic in index.html
    navContainer.innerHTML = navbarHTML;
    
    // Auto-Highlight Active Link
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.nav-item');
    links.forEach(link => {
        if (link.getAttribute('href') === currentPath.split('/').pop()) {
            link.classList.add('opacity-100', 'border-b', 'border-current');
        }
    });
}

// 4. Initialize Footer
const footerContainer = document.getElementById('app-footer');
if (footerContainer) {
    footerContainer.className = "bg-[#2E241E] text-[#E6D8C5] pt-20 pb-10 border-t border-[#4A3B32] relative z-20 mt-auto";
    footerContainer.innerHTML = footerHTML;
}

// 5. Shared Logic: Setup Auth UI in Navbar
window.setupNavbarAuth = (user, adminEmail) => {
    const container = document.getElementById('auth-container');
    const mobileLinks = document.getElementById('mobile-auth-links');
    if(!container || !mobileLinks) return;

    if (user) {
        const name = user.displayName ? user.displayName.split(' ')[0] : 'Member';
        const isAdmin = user.email === adminEmail;
        
        // Desktop Auth UI
        container.innerHTML = `
            <button onclick="toggleUserMenu()" class="text-xs font-bold uppercase hover:opacity-80 transition flex items-center gap-2 focus:outline-none">
                <span class="hidden md:inline">Hi, ${name}</span> <i class="fa-solid fa-chevron-down text-[9px]"></i>
            </button>
            <div id="user-dropdown" class="absolute right-0 top-full mt-4 w-48 bg-white shadow-xl border border-[#D6C8B5] rounded-sm hidden flex-col z-[60] animate-fade-in-down text-themeText text-left">
                ${isAdmin ? `<a href="admin.html" class="block w-full px-5 py-3 text-xs font-bold uppercase bg-gray-900 text-white hover:bg-black text-left border-b border-gray-100 transition">Dashboard</a>` : ''}
                <a href="profile.html" class="block w-full px-5 py-3 text-xs font-bold uppercase hover:bg-gray-50 text-left border-b border-gray-100 transition">My Profile</a>
                <a href="wishlist.html" class="block w-full px-5 py-3 text-xs font-bold uppercase hover:bg-gray-50 text-left border-b border-gray-100 transition text-[#D97706]"><i class="fa-solid fa-heart mr-1"></i> My Wishlist</a>
                <a href="orders.html" class="block w-full px-5 py-3 text-xs font-bold uppercase hover:bg-gray-50 text-left border-b border-gray-100 transition">My Orders</a>
                <button onclick="window.handleLogout()" class="block w-full px-5 py-3 text-xs font-bold uppercase hover:bg-red-50 text-left text-red-500 transition">Sign Out</button>
            </div>`;
        
        // Mobile Auth UI
        mobileLinks.innerHTML = `
            <div class="flex flex-col gap-4 text-center">
                <div class="flex items-center justify-center gap-3 mb-2">
                        <div class="w-10 h-10 bg-themeText text-white rounded-full flex items-center justify-center font-bold text-lg uppercase">${name[0]}</div>
                        <p class="text-xl font-bold uppercase tracking-widest">${name}</p>
                </div>
                ${isAdmin ? `<a href="admin.html" class="text-lg font-bold text-black border-b border-black pb-2">Admin Dashboard</a>` : ''}
                <button onclick="window.handleLogout()" class="text-lg text-red-500 uppercase font-bold tracking-widest pt-4 border-t border-themeText/10">Sign Out</button>
            </div>`;
    } else {
        // Desktop Guest
        container.innerHTML = `
            <a href="login.html" class="text-xs font-bold uppercase hover:opacity-75 transition flex items-center gap-2">
                <span id="nav-auth-text" class="hidden md:inline">Sign In</span> <i class="fa-regular fa-user text-lg"></i>
            </a>`;
        // Mobile Guest
        mobileLinks.innerHTML = `
            <a href="login.html" class="w-full bg-themeBtn text-white py-4 font-bold uppercase tracking-widest text-center">Sign In</a>`;
    }
};

// 6. Mobile Menu Logic (inline styles, not Tailwind classes)
window.toggleMobileMenu = (force) => {
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-menu-overlay');
    const navbar = document.getElementById('navbar');
    if (!menu || !overlay) return;

    // Put menu below navbar (dynamic)
    if (navbar) {
        const navH = navbar.getBoundingClientRect().height || 0;
        menu.style.top = `${Math.max(56, navH + 8)}px`;
        menu.style.maxHeight = `calc(100vh - ${Math.max(56, navH + 20)}px)`;
    }

    const isOpen = overlay.style.pointerEvents === 'auto';
    const shouldOpen = (typeof force === 'boolean') ? force : !isOpen;

    if (shouldOpen) {
        overlay.style.opacity = '1';
        overlay.style.visibility = 'visible';
        overlay.style.pointerEvents = 'auto';
        menu.style.transform = 'translateX(0)';
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
    } else {
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';
        overlay.style.pointerEvents = 'none';
        menu.style.transform = 'translateX(-120%)';
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
    }
};

window.closeMobileMenu = () => window.toggleMobileMenu(false);

// Close: overlay click
document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'mobile-menu-overlay') {
        window.closeMobileMenu();
    }
});

// Close: click any link inside mobile menu
document.addEventListener('click', (e) => {
    const a = e.target && e.target.closest ? e.target.closest('#mobile-menu a') : null;
    if (a) window.closeMobileMenu();
});

// Close: Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') window.closeMobileMenu();
});

// Keep position correct on resize
window.addEventListener('resize', () => {
    const overlay = document.getElementById('mobile-menu-overlay');
    if (overlay && overlay.style.pointerEvents === 'auto') {
        window.toggleMobileMenu(true);
    }
});
