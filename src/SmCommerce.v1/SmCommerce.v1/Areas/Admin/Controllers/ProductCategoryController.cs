using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SmCommerce.v1.Data.Repository;
using SmCommerce.v1.Models;

namespace SmCommerce.v1.Areas.Admin.Controllers
{
    [Area(areaName: "Admin")]
    public class ProductCategoryController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;

        public ProductCategoryController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Upsert(int? id)
        {
            ProductCategory productCategory = new ProductCategory();
            if (id.HasValue)
            {
                productCategory = _unitOfWork.ProductCategoryRepository.GetById(id.Value);
                if (productCategory == null)
                    return NotFound();
            }
            return View(productCategory);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Upsert(ProductCategory productCategory)
        {
            if (ModelState.IsValid)
            {
                if (productCategory.Id == 0)
                {
                    _unitOfWork.ProductCategoryRepository.Add(productCategory);
                    _unitOfWork.Save();
                }
                else
                    _unitOfWork.ProductCategoryRepository.Update(productCategory);
                return RedirectToAction(nameof(Index));
            }
            return View(productCategory);
        }

        #region [ Api Calls Json ]
        [HttpGet]
        public IActionResult GetList()
        {
            var data = _unitOfWork.ProductCategoryRepository.GetList();
            return Json(new { data });
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            object message = new { success = false, text = "Error while deleting." };
            var model = _unitOfWork.ProductCategoryRepository.GetById(id);
            if (model != null)
            {
                _unitOfWork.ProductCategoryRepository.Remove(model);
                _unitOfWork.Save();
                message = new { success = true, text = "Deleted successfully." };
            }
            return Json(message);
        }
        #endregion
    }
}