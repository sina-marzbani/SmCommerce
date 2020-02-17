﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace SmCommerce.v1.Data.Repository
{
    public interface IRepository<T> where T : class
    {
        T GetById(int id);
        IEnumerable<T> GetList(Expression<Func<T, bool>> filter = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, string includeProperties = null);
        T GetFirstOrDefault(Expression<Func<T, bool>> filter = null, string includeProperties = null);
        void Add(T entity);
        void Remove(int id);
        void Remove(T entity);
    }
}
