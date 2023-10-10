<<<<<<< HEAD
module.exports = {
  // Can be safely removed in newer versions of Next.js
  future: {
    // by default, if you customize webpack config, they switch back to version 4.
    // Looks like backward compatibility approach.
    webpack5: true,
  },

  webpack(config) {
    config.resolve.fallback = {
      // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped.
      ...config.resolve.fallback,

      fs: false, // the solution
      path: false,
    };

    return config;
  },
};
=======
module.exports = {

  // Can be safely removed in newer versions of Next.js
  future: {

    // by default, if you customize webpack config, they switch back to version 4.
    // Looks like backward compatibility approach.
    webpack5: true,   
  },

  webpack(config) {
    config.resolve.fallback = {

      // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped.
      ...config.resolve.fallback,  

      fs: false, // the solution
    };
    
    return config;
  },
};
>>>>>>> aa1dc87046d95bf1bf732121167f9cf3187cab8b
