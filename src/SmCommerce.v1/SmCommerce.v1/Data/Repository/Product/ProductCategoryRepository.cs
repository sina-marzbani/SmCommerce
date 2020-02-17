using Microsoft.AspNetCore.Mvc.Rendering;
using SmCommerce.v1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmCommerce.v1.Data.Repository.Product
{
    public class ProductCategoryRepository : Repository<ProductCategory>, IProductCategoryRepository
    {
        private readonly ApplicationDbContext _db;

        public ProductCategoryRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
        public IEnumerable<SelectListItem> GetListForDropDown()
        {
            return _db.ProductCategory.Select(s => new SelectListItem
            {
                Value = s.Id.ToString(),
                Text = s.Title
            });
        }
        public void Update(ProductCategory productCategory)
        {
            // Use base calss method
            //var dbModel = GetFirstOrDefault(f => f.Id == productCategory.Id);

            var dbModel = _db.ProductCategory.FirstOrDefault(f => f.Id == productCategory.Id);
            if (dbModel != null)
            {
                dbModel.Title = productCategory.Title;
                dbModel.ParentId = productCategory.ParentId;
                dbModel.DisplayOrder = productCategory.DisplayOrder;
                dbModel.Published = productCategory.Published;
                dbModel.ModifiedDate = productCategory.ModifiedDate;
                dbModel.Description = productCategory.Description;
                _db.SaveChanges();
            }
        }
    }
}
