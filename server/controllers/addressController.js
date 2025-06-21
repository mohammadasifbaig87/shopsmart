import Address from "../models/Address.js";

// Add Address: POST /api/address/add
export const addAddress = async (req, res) => {
    try {
        const userId = req.userId; // ✅ Get from authUser middleware
        const { address } = req.body;

        if (!userId || !address) {
            return res.status(400).json({ success: false, message: "Missing userId or address data" });
        }

        await Address.create({ ...address, userId });

        res.json({ success: true, message: "Address added successfully" });
    } catch (error) {
        console.log("Add Address Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Address: GET /api/address/get
export const getAddress = async (req, res) => {
    try {
        const userId = req.userId; // ✅ Get from authUser middleware

        const addresses = await Address.find({ userId });

        res.json({ success: true, addresses });
    } catch (error) {
        console.log("Get Address Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};
