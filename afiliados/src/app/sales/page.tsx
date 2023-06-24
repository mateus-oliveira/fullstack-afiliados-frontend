'use client';

import { useEffect, useState } from 'react';

interface Seller {
  id: number;
  name: string;
  seller_type: number;
}

interface SalesTransaction {
  id: number;
  product: string;
  price: number;
  purchased_date: string;
  sale_type: number;
  seller: Seller;
}

const SaleTypeColors: Record<number, string> = {
  1: 'bg-green-100',
  2: 'bg-blue-100',
  3: 'bg-red-100',
  4: 'bg-yellow-100',
};

function SalesTransactionPage() {
  const [salesTransactions, setSalesTransactions] = useState<SalesTransaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [previousPage, setPreviousPage] = useState<string | null>(null);

  useEffect(() => {
    fetchSalesTransactions();
  }, []);

  const fetchSalesTransactions = async (url?: string) => {
    try {
      setLoading(true);
      const response = await fetch(url || `http://localhost:8000/sales/sales-transactions/`, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg3NjQwMDYwLCJqdGkiOiIwNGZjZGVjMTNjNmQ0ZmQ0YjliMmRmNWY3YzAzMzdjMCIsInVzZXJfaWQiOjEsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWQiOjF9.mhvs7Q2rFr_6og0vahx9duTpGS8BKTLmvV-zgHfOosHnY21FVKgTQaWDBeZSa6faBW6bUNDw4P75OIH12D08ZA',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch sales transactions');
      }
      const data = await response.json();
      setSalesTransactions(data.results);
      setNextPage(data.next);
      setPreviousPage(data.previous);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (nextPage) {
      fetchSalesTransactions(nextPage);
    }
  };

  const handlePreviousPage = () => {
    if (previousPage) {
      fetchSalesTransactions(previousPage);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sales Transactions</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 ">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Product</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Purchased Date</th>
              <th className="py-2 px-4 border-b">Sale Type</th>
              <th className="py-2 px-4 border-b">Seller Name</th>
            </tr>
          </thead>
          <tbody>
            {salesTransactions.map((transaction) => (
              <tr key={transaction.id} className={SaleTypeColors[transaction.sale_type]}>
                <td className="py-2 px-4 border-b text-center">{transaction.id}</td>
                <td className="py-2 px-4 border-b text-center">{transaction.product}</td>
                <td className="py-2 px-4 border-b text-center">{transaction.price}</td>
                <td className="py-2 px-4 border-b text-center">{transaction.purchased_date}</td>
                <td className="py-2 px-4 border-b text-center">{transaction.sale_type}</td>
                <td className="py-2 px-4 border-b text-center">{transaction.seller.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={handlePreviousPage}
          disabled={!previousPage}
        >
          Previous
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleNextPage}
          disabled={!nextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default SalesTransactionPage;
