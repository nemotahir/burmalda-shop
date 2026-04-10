using Microsoft.EntityFrameworkCore;
using Burmalda.Server.Models;

namespace Burmalda.Server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Начальные данные – категории
            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Процессоры" },
                new Category { Id = 2, Name = "Видеокарты" },
                new Category { Id = 3, Name = "Оперативная память" },
                new Category { Id = 4, Name = "Материнские платы" }
            );

            // Начальные данные – товары
            modelBuilder.Entity<Product>().HasData(
                new Product { Id = 1, Name = "Intel Core i7-13700K", Description = "16 ядер, до 5.4 ГГц", Price = 38500, ImageUrl = "https://via.placeholder.com/200", Stock = 10, CategoryId = 1 },
                new Product { Id = 2, Name = "AMD Ryzen 9 7950X", Description = "16 ядер, 5.7 ГГц", Price = 55000, ImageUrl = "https://via.placeholder.com/200", Stock = 5, CategoryId = 1 },
                new Product { Id = 3, Name = "NVIDIA RTX 4070 Ti", Description = "12GB GDDR6X", Price = 82000, ImageUrl = "https://via.placeholder.com/200", Stock = 7, CategoryId = 2 },
                new Product { Id = 4, Name = "AMD Radeon RX 7900 XT", Description = "20GB GDDR6", Price = 91000, ImageUrl = "https://via.placeholder.com/200", Stock = 3, CategoryId = 2 },
                new Product { Id = 5, Name = "Kingston 32GB DDR5", Description = "5600MHz", Price = 11500, ImageUrl = "https://via.placeholder.com/200", Stock = 15, CategoryId = 3 },
                new Product { Id = 6, Name = "MSI PRO B760-P", Description = "LGA1700, DDR5", Price = 14500, ImageUrl = "https://via.placeholder.com/200", Stock = 8, CategoryId = 4 }
            );
        }
    }
}