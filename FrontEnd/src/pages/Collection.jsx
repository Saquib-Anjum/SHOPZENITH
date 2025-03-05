import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from '../components/ProductItem'
const Collection = () => {
  const { products ,search,showSearch} = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);

  const [subCategory, setSubCategory] = useState([]);  const [sortType ,setSortType] =useState('relavent onChange={}')
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    }

    else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let productCopy = products.slice();
     if(showSearch && search ){
      productCopy=productCopy.filter(item=> item.name.toLowerCase().includes(search.toLowerCase()))
     }
    
    if (category.length > 0) {
      productCopy = productCopy.filter(item => category.includes(item.category));
    }
    if (subCategory.length > 0) {
      productCopy = productCopy.filter(item => subCategory.includes(item.subCategory));
    }
    setFilterProduct(productCopy);
  }

  const sortProducts = (productCopy) => {
    let filterProductsCopy = filterProduct.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProduct(filterProductsCopy.sort((a,b)=>(a.price - b.price)))
        break;
      case 'high-low':
        setFilterProduct(filterProductsCopy.sort((a,b)=>(b.price - a.price)))
        break;
      default:
        applyFilter()
         break
     }
  }
  useEffect(() => {
    setFilterProduct(products);
  }, []);

  useEffect(() => {
    applyFilter()
  }, [category, subCategory,search,showSearch,products]);
  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-10 pt-10 border-t">
      {/* filter option */}
      <div className="min-w-60">
        <p
          onClick={() => {
            setShowFilter(!showFilter);
          }}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS{" "}
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : " "}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        {/* catagory filter CATAGORY */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? " " : "hidden"} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORY</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Men"} onChange={toggleCategory} />
              MEN
            </p>

            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Women"} onChange={toggleCategory} />
              WOMEN
            </p>

            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Kids"} onChange={toggleCategory} />
              KIDS
            </p>
          </div>
        </div>

        {/* sub-catagory  TYPE*/}

        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? " " : "hidden"} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Topwear"} onChange={toggleSubCategory} />
              TOPWARE
            </p>

            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Bottomwear"} onChange={toggleSubCategory} />
              BOTTOMWARE
            </p>

            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Winterwear"} onChange={toggleSubCategory} />
              WINTERWARE
            </p>
          </div>
        </div>
      </div>

      {/* right side  */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* product sort */}
          <select className="border border-gray-300 text-sm px-2" onChange={(e)=>setSortType(e.target.value)}>
            <option value="relavent">Sort by:Relavent</option>
            <option value="low-high" >Sort by:Low t0 High</option>
            <option value="high-low" >Sort by:High to Low</option>
          </select>
        </div>

        {/* map products  */}
        <div className="grid grid-cols-2 mid:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">{
          filterProduct.map((item, idx) => (
            <ProductItem key={idx} id={item._id} image={item.image} name={item.name} price={item.price} />
          ))
        }</div>
      </div>
    </div>
  );
};

export default Collection;
