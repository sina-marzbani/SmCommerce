using SmCommerce.v1.Models.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SmCommerce.v1.Models
{
    public class Product : BaseModel
    {
        [Required]
        public string Title { get; set; }
    }
}
