import dotenv from 'dotenv';
import userModel from '../models/userModel.js';
import foodModel from '../models/foodModel.js';
import orderModel from '../models/orderModel.js';
import couponModel from '../models/couponModel.js';

dotenv.config();

const getChatCompletion = async (req, res) => {
    const userMessage = req.body.message;
    const { userId } = req.body;

    try {

        if (!userMessage) {
            return res.status(400).json({ success: false, 
                message: "Message is required" });
        }
        const userData = await userModel.findById(userId)
        if (!userData) {
            return res.status(400).json({ sucess: false, message: "User not Found" })
        }

        //dont make it const this var is changing
        let botMessage = ""

        //array for checking usermessage
        const aboutBot = [
            'your name', 'about you', 'who are you', 'your name', 
            'yourself', 'bot info', 'bot details', 'your identity', 
            'who made you', 'what can you do', 'describe yourself', 'introduce yourself'
        ]        
        const cartTags = ['cart', 'added item', 'my item']
        const categoryTags = ['salad', 'rolls', 'deserts', 'sandwich', 'cake', 'pure veg', 'pasta', 'noodles']
        const foodTags = ['food', 'cuizine', 'item', 'item detail', 'food item']
        let foodName = await foodModel.find({}, "name")
        const orderTags = ['order', 'food status', 'order status', 'track', 'track order']
        const cancelOrderTags = [
            'cancel', 'cancel order','change order','change my order','change myorder', 'order cancel', 'cancel my order',
            'stop order', 'abort order', 'void order', 'discard order',
            'delete order', 'revoke order', 'undo order', 'cancel request', 'delete', 'terminate', 'abort', 'withdraw',
            'terminate order', 'withdraw order', 'order cancellation'
        ]
        const discountTags = ['discount', 'offer', 'coupon', 'coupan']
        const openCloseStatus = [
            'open', 'timing', 'timming', 'close', 'closed', 'opening', 'closing', 'hours', 'time',
            'available', 'working', 'schedule', 'active', 'operating', 'status'
        ]
        const ownersTag = ['own', 'head', 'boss', 'manager', 'chief', 'founder', 'admin', 'leader', 'owner']
        const greetings = [
            'hi', 'hello', 'hey', 'how are', 'gm', 'gn', 'morning', 'evening', 'night',
            'whats', 'howdy', 'greeting', 'greet', 'nice to meet', 'pleasure', 'good', 'hope well', 'been good', 'long time',
            'nice to see', 'any updates'
        ]
        const helpTags = [
            'help', 'contact', 'support', 'assist', 'issue', 'problem',
            'trouble', 'faq', 'guide', 'doubt', 'customer care', 'query', 'question',
            'service', 'report', 'complaint', 'emergency', 'helpline', 'resolve'
        ]
        const endingWords = [
            "ok", "okay", "got it", "glad", "understood", "alright", "fine", "noted", "sure", "sounds good",
            "makes sense", "I see", "cool", "thanks", "thank you", "thankyou","awesome", "great", "perfect", "nice",
            "yep", "yeah", "right", "alright then", "good to know", "fair enough", "clear",
            "no problem", "gotcha", "copy that", "will do", "done", "that's all", "bye"
        ]
        const abusiveWords = [
            "idiot", "stupid", "dumb", "mad", "ass", "fuck", "fool", "moron", "loser", "suck",
            "trash", "useless", "bastard", "crap", "shit", "fuck", "asshole",
            "bitch", "slut", "damn", "piss", "kill", "terror", "wtf", "dick", "prick", "cunt", "whore",
            "bloody", "scum", "jerk"
        ]


        // if else ladder for each message
        if (abusiveWords.some(word => userMessage.toLowerCase().includes(word))) {
            botMessage = "Please use respectful language.";
        }
        else if (aboutBot.some(tag=>userMessage.toLowerCase().includes(tag))) {
            botMessage = "I'm a smart AI assistant here to help you! Ask me anything, and I'll do my best to assist you."
        }
        else if (helpTags.some(tag => userMessage.toLowerCase().includes(tag))) {
            botMessage = "For assistance, please contact our support team at support@example.com or call us at +1234567890.";
        }
        else if (cartTags.some(tag => userMessage.toLowerCase().includes(tag))) {

            const cartData = userData.cartData


            let hasItem = false
            Object.values(cartData).map(value => {
                if (value > 0) {
                    hasItem = true
                }
            })

            if (hasItem) {

                let foodId = []
                Object.keys(cartData).map(itemId => {
                    if (cartData[itemId] > 0) {
                        foodId.push(itemId)
                    }
                })

                let foodInfo = await Promise.all(
                    foodId.map(async (itemId) => {
                        return await foodModel.findById(itemId)
                    })
                )

                botMessage = `Items in cart: ${foodInfo.length} , Item Info: `

                foodInfo.map((item, index) => {
                    if (index === foodInfo.length - 1) {
                        botMessage += item.name
                    }
                    else {
                        botMessage += item.name + ","
                    }
                })

            }
            else {
                botMessage = "No item in cart Please add"
            }

        }
        else if (foodTags.some(tag => userMessage.toLowerCase().includes(tag))) {
            botMessage = "which food detail do u want please write exact name of item for details Thank You"
        }
        else if (foodName.some(obj => userMessage.toLowerCase().includes(obj.name.toLowerCase()))) {

            let foodObj = foodName.find(obj => userMessage.toLowerCase().includes(obj.name.toLowerCase()))

            const foodDetails = await foodModel.findById(foodObj._id)
            if (!foodDetails) {
                return res.json({ success: false, message: "error in finding food item for chat box reply" })
            }

            botMessage = `ITEM NAME: ${foodDetails.name}, ITEM CATEGORY: ${foodDetails.category}, ITEM DESCRIPTION: ${foodDetails.description}, ITEM PRICE: ₹${foodDetails.price}`

        }
        else if (categoryTags.some(tag => userMessage.toLowerCase().includes(tag))) {
            const matchedItem = categoryTags.find(tag => userMessage.toLowerCase().includes(tag))
            // we have category in lowercase we need Salads first letter capital;
            const category = matchedItem[0].toUpperCase() + matchedItem.slice(1)

            const categoryItems = await foodModel.find({ category }, "name")

            botMessage = `${category} availabel : `

            categoryItems.map((item, index) => {
                if (index === categoryItems.length - 1) {
                    botMessage += `${item.name.toUpperCase()}`
                }
                else {
                    botMessage += `${item.name.toUpperCase()},`
                }
            })
            botMessage += ",If u want details of items write their exact name thanks"

        }
        else if (cancelOrderTags.some(tag=>userMessage.toLowerCase().includes(tag))) {
            botMessage = "Want to change or cancel the order? Call at: +1234567890 to cancel the order if ordered within 5minutes else cannot be canceled thank you."
        }
        else if (orderTags.some(tag => userMessage.toLowerCase().includes(tag))) {
            const lastOrder = await orderModel.findOne({ userId }).sort({ createdAt: -1 })

            botMessage = `Your last order STATUS: ${lastOrder.status.toUpperCase()}, `

            botMessage += "ORDER DETAILS: "

            lastOrder.items.map((food, index) => {
                if (index === lastOrder.length - 1) {
                    botMessage += `${food.name}X${food.quantity}`
                }
                else {
                    botMessage += `${food.name}X${food.quantity}, `
                }
            })
        }
        else if (discountTags.some(tag => userMessage.toLowerCase().includes(tag))) {

            const discountDetails = await couponModel.findOne({ isActive: true })

            if (discountDetails) {
                botMessage = `Coupon Code: ${discountDetails.name}, `

                if (discountDetails.type === "percentage") {
                    botMessage += `${discountDetails.value}% on order above ${discountDetails.condition} is active`
                }
                else {
                    botMessage += `₹${discountDetails.value} on order above ${discountDetails.condition} is active`
                }

            }
            else {
                botMessage = "No coupon Available at a moment"
            }

        }
        else if (openCloseStatus.some(tag => userMessage.toLowerCase().includes(tag))) {
            const currentHour = new Date().getHours();
            const openingTime = 9;  // Example: Opens at 9 AM
            const closingTime = 23; // Example: Closes at 11 PM

            if (currentHour >= openingTime && currentHour < closingTime) {
                botMessage = "Yes, we are open! Our hours are 9 AM - 11 PM.";
            } else {
                botMessage = "Sorry, we are currently closed. Our hours are 9 AM - 11 PM.";
            }
        }
        else if (ownersTag.some(tag => userMessage.toLowerCase().includes(tag))) {
            botMessage = "My Boss Prithvi and Archit are owners of this store"
        }
        else if (greetings.some(tag => userMessage.toLowerCase().includes(tag))) {
            const botReplies = [
                'Hey there! Hope you\'re having a great day! 😊',
                'Hello! How can I assist you today? 😃',
                'Hi! Nice to see you! What can I do for you? 🚀',
                'Hey! I’m here to help. Let me know what you need! ✨',
                'Good day! Feel free to ask me anything. 😊'
            ];
            botMessage = botReplies[Math.floor(Math.random() * botReplies.length)]
        }
        else if (endingWords.some(tag => userMessage.toLowerCase().includes(tag))) {

            const botReplies = [
                "Glad to help! Let me know if you need anything else. 😊",
                "You're welcome! Have a great day! 🌟",
                "Anytime! Feel free to ask more questions. 🚀",
                "Got it! Ping me if you need more help. 😉",
                "Happy to assist! See you soon. 👋"
            ]
            botMessage = botReplies[Math.floor(Math.random() * botReplies.length)]

        }
        else {
            botMessage = "dont understood what u mean please check query thanks"
        }



        res.status(200).json({ success: true, reply: botMessage })

    } catch (error) {
        res.json({ success: false, message: "Error in chat bot controller " })
    }
};

export { getChatCompletion };
