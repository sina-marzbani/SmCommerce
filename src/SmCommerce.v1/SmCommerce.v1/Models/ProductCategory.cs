using SmCommerce.v1.Models.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SmCommerce.v1.Models
{
    public class ProductCategory : BaseModel
    {
        [Required]
        [MaxLength(256)]
        [Display(Name = "عنوان")]
        public string Title { get; set; }

        public int? ParentId { get; set; }

        [ForeignKey("ParentId")]
        public ProductCategory ProductCategoryParent { get; set; }

        [Display(Name = "ترتیب نمایش در منو")]
        public int DisplayOrder { get; set; }

        [Display(Name = "منتشر کردن")]
        public bool Published { get; set; }

        [Required]
        public DateTime ModifiedDate { get; set; }

        [Display(Name = "توضیحات")]
        public string Description { get; set; }
    }
}
