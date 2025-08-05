import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../features/cartSlice";
import { FaCartPlus } from "react-icons/fa";
import toast from "react-hot-toast";

const AddToCart = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to add items to your cart.");
      navigate("/login");
      return;
    }
    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart!`);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="mt-4 sm:mt-0 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
    >
      <FaCartPlus className="w-5 h-5" />
      <span>Add to Cart</span>
    </button>
  );
};

export default AddToCart;