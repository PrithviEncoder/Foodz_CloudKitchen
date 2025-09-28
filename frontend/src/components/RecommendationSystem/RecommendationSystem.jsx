import { useState, useEffect, useContext } from "react";
import { StoreContext } from '../../ContextApi/StoreContext.jsx'
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios"

const RecommendationSystem = () => {

  const [index, setIndex] = useState(0);
  const { SERVER_URL } = useContext(StoreContext)
  const [cards, setCards] = useState([])
  const token = localStorage.getItem("token");

  const Apis = async () => {

    try {
      console.log("token", token);
      let newCards = []
      if (token) {

        const [res1, res3] = await Promise.all([
          axios.post(SERVER_URL + "/api/order/user-frequent-order", {}, { headers: { token } }),
          axios.post(SERVER_URL + "/api/order/random-user-order-item", {}, { headers: { token } })
        ])

        if (res1.data.success) {
          res1.data.item["recommandation"] = "You ordered most"
          newCards.push(res1.data.item)
        }

        if (res3.data.success) {
          res3.data.item["recommandation"] = "You ordered in the past"
          newCards.push(res3.data.item)
        }
      }

      const [res2, res4, res5] = await Promise.all([
        axios.get(SERVER_URL + "/api/order/frequent-order"),
        axios.get(SERVER_URL + "/api/order/seasonal-item"),
        axios.get(SERVER_URL + "/api/order/recent-item")
      ])

      if (res2.data.success) {
        res2.data.item["recommandation"] = "People's most ordered"
        newCards.push(res2.data.item)
      }

      if (res4.data.success) {
        res4.data.item["recommandation"] = "Hot summer specal"
        newCards.push(res4.data.item)
      }
      if (res5.data.success) {
        res5.data.item["recommandation"] = "Newly added item"
        newCards.push(res5.data.item)
      }

      setCards(newCards)

    } catch (error) {
      console.log(error || "error in recommadation api call loc:frontend");
    }
  }

  useEffect(() => {
    Apis()// if login or logout or onrefresh
  }, [token]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % cards.length);
    }, 3000); // Auto-scroll every 3 seconds
    return () => clearInterval(interval);
  }, [cards.length, token]);

  const nextSlide = () => setIndex((prev) => (prev + 1) % cards.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + cards.length) % cards.length);

  return (
    <div className="reccom">

      <h2 className="text-[18px] md:text-[23px] lg:text-[25px]  ml-10 lg:ml-16 font-semibold my-4 lg:my-8">Recommendations</h2>
      <div className="relative w-full m-auto sm:w-[90%]
    md:w-[94%] bg-[#FFE5D9]
  flex justify-center items-center rounded-md overflow-hidden p-5">
        <button onClick={prevSlide} className="absolute left-0 z-10 p-2 bg-gray-800/50 text-white rounded-full">
          <ChevronLeft size={24} />
        </button>
        <div className="card-wrapper flex flex-wrap gap-4 w-full justify-center">
          {cards.map((card, i) => {
            let scale = i === index ? 1.2 : 1;
            let opacity = Math.abs(i - index) > 1 ? 0.5 : 1;
            return (
              <motion.div
                key={i}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale, opacity }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="relative w-32 lg:w-44 xl:w-52 h-28 lg:h-36 xl:h-44 p-1 lg:p-1 rounded-xl shadow-md bg-white flex flex-col items-center text-center border border-gray-200"
              >
                {/* images */}
                <div className="relative w-full h-24 lg:h-32 rounded-lg overflow-hidden shadow-sm">
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Recommendation Reason */}
                <span className="absolute top-3 left-3 bg-green-500 text-white text-[6px] lg:text-[8px] xl:text-[10px] font-semibold px-3 py-1 rounded-full">
                  {card.recommandation || "Chef’s Pick"}
                </span>

                {/* Name & Price */}
                <h3 className=" text-[6px] lg:text-[8px] xl:text-[10px] font-semibold text-gray-900">{card.name}</h3>
                <span className="text-[7px] lg:text-[9px] xl:text-[11px] font-bold text-green-600">₹{card.price}</span>
              </motion.div>
            );
          })}
        </div>
        <button onClick={nextSlide} className="absolute right-0 z-10 p-2 bg-gray-800/50 text-white rounded-full">
          <ChevronRight size={24} />
        </button>
      </div>

    </div>
  )
}

export default RecommendationSystem