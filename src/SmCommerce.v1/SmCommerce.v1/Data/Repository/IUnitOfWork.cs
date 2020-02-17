using SmCommerce.v1.Data.Repository.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmCommerce.v1.Data.Repository
{
    public interface IUnitOfWork : IDisposable
    {
        IProductCategoryRepository ProductCategoryRepository { get; }
        void Save();
    }
}
