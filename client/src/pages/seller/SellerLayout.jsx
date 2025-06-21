import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SellerLayout = () => {
  const {axios,navigate } = useAppContext();

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ];

  const logout = async () => {
    try {
      const {data}= await axios.get('/api/seller/logout');
      if(data.success){
        toast.success(data.message)
        navigate('/')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
        <Link to="/">
          <img src={assets.logo} alt="logo" className="cursor-pointer w-34 md:w-38" />
        </Link>
        <div className="flex items-center gap-5 text-gray-500">
          <p>Hi! Admin</p>
          <button onClick={logout} className="border rounded-full text-sm px-4 py-1">
            Logout
          </button>
        </div>
      </div>

      {/* Layout with Sidebar and Outlet */}
      <div className="flex min-h-[calc(100vh-64px)]"> {/* Adjust height as needed */}
        {/* Sidebar */}
        <div className="md:w-64 w-16 border-r text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/seller"}
              className={({ isActive }) =>
                `flex items-center py-3 px-4 gap-3 
                ${
                  isActive
                    ? "border-r-4 md:border-r-[6px] bg-indigo-500/10 border-indigo-500 text-indigo-500"
                    : "hover:bg-gray-100/90 border-white"
                }`
              }
            >
              <img src={item.icon} alt="" className="h-4 w-4" />
              <p className="md:block hidden text-center">{item.name}</p>
            </NavLink>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default SellerLayout;
