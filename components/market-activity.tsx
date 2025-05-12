const fetchMarketData = useCallback(async (days) => {
    setIsLoading(true);
    setError(null);
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/solana/market_chart?vs_currency=usd&days=${days}&interval=daily`);
        if (!response.ok) throw new Error("Failed to fetch market data");

        const result = await response.json();
        console.log("API Response:", result); // Add this line

        const marketData = result.prices.map(([timestamp, price], index) => ({
            date: new Date(timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            price: parseFloat(price).toFixed(2),
            volume: (result.total_volumes[index][1] / 1_000_000).toFixed(0),
            timestamp,
        }));
        console.log("Transformed Data:", marketData); // Add this line

        setData(marketData);
    } catch (err) {
        console.error(err); // Add this line
        setError("Failed to load market data. Please try again later.");
    } finally {
        setIsLoading(false);
    }
}, []);
       
