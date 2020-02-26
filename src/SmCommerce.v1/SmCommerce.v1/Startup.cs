using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.EntityFrameworkCore;
using SmCommerce.v1.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SmCommerce.v1.Data.Repository;

namespace SmCommerce.v1
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public void ConfigureServices(IServiceCollection services)
        {
            #region [ Cookie ]
            //services.Configure<CookiePolicyOptions>(options =>
            //{
            //    // This lambda determines whether user consent for non-essential cookies is needed for a given request.
            //    options.CheckConsentNeeded = context => true;
            //});
            #endregion

            #region [ ApplicationDbContext ]
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            #endregion

            #region [ Identity ]
            // Default:
            //services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
            //        .AddEntityFrameworkStores<ApplicationDbContext>();
            services.AddIdentity<IdentityUser, IdentityRole>(options => options.SignIn.RequireConfirmedAccount = true)
                    .AddEntityFrameworkStores<ApplicationDbContext>()
                    // If use AddDefaultIdentity method, there is TokenProviders by default and it's not needed to add below method.
                    // below method allow use two factor authentication or token system
                    .AddDefaultTokenProviders();
            // It's not needed to add from .netcore 3.0 onwards
            //.AddDefaultUI(UIFramework.Bootstrap4);

            services.ConfigureApplicationCookie(options =>
            {
                options.LoginPath = $"/Identity/Account/Login";
                options.LogoutPath = $"/Identity/Account/Logout";
                options.AccessDeniedPath = $"/Identity/Account/AccessDenied";
            });

            //services.AddSingleton<IEmailSender, EmailSender>();
            #endregion

            #region [ UnitOfWork ]
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            #endregion

            #region [ DbInitializer ]
            //services.AddScoped<IDbInitializer, DbInitializer>();
            #endregion

            #region [ Session ]
            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromMinutes(30);
                options.Cookie.HttpOnly = true;
                options.Cookie.IsEssential = true;
            });
            #endregion

            #region [ Razor ]
            // Default:
            //services.AddControllersWithViews()
            //services.AddRazorPages();
            services.AddControllersWithViews()
                    .AddNewtonsoftJson()
                    .AddRazorRuntimeCompilation(); // brfore asp.net core 3.0 has by default

            services.AddRazorPages();
            services.AddMvc();
            #endregion            
        }
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseRouting();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseSession();
            //app.UseCookiePolicy();

            //------------------------------
            // **How to call this method just one time?**
            //dbInitializer.Initialize();
            //------------------------------
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{area=Admin}/{controller=ProductCategory}/{action=Index}/{id?}");
                endpoints.MapRazorPages();
            });
        }
    }
}
