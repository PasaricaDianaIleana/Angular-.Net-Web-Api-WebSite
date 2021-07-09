using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using RestaurantDataAccess;
using RestaurantDataAccess.Models;
using RestaurantProjectWebApi.DataRepository;
using RestaurantProjectWebApi.Repository;
using System;
using System.Text;

namespace RestaurantProjectWebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddDbContextPool<AppDbContext>
                (options =>options.UseSqlServer(Configuration.GetConnectionString("RestaurantConnectionString")));
            services.AddTransient<ICategoryRepository, CategoryRepository>();
            services.AddTransient<IItemsRepository, ItemRepository>();
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddDefaultIdentity<User>(options =>
            {
                options.Password.RequiredLength = 4;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                

            }).AddEntityFrameworkStores<AppDbContext>();
            services.AddCors();
            var key = Encoding.UTF8.GetBytes(Configuration["ApplicationSettings:Token_Key"].ToString());
            services.AddAuthentication(opt =>
            { 
                //set default scheme to jwt authentication
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(opt=> {
                //enabled another types of authentication requests
                opt.RequireHttpsMetadata = false;
                //don't save the token in server after authentication
                opt.SaveToken = false;
                opt.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    //system will validate  security key during token validation 
                    ValidateIssuerSigningKey = true,

                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience=false,
                    ClockSkew=TimeSpan.Zero

                };
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }
            app.UseCors(builder =>
            builder.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
            app.UseAuthentication();
            app.UseHttpsRedirection();
            app.UseMvc();
          
        }
    }
}
