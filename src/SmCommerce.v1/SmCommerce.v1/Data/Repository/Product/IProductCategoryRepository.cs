using Microsoft.AspNetCore.Mvc.Rendering;
using SmCommerce.v1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmCommerce.v1.Data.Repository.Product
{
    public interface IProductCategoryRepository : IRepository<ProductCategory>
    {
        IEnumerable<SelectListItem> GetListForDropDown();
        void Update(ProductCategory productCategory);
    }
}
