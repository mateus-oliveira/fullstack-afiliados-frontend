'use client';

import { useEffect, useState } from 'react';
import Legend from '../components/Legend';

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
  1: 'bg-green-400',
  2: 'bg-blue-400',
  3: 'bg-red-400',
  4: 'bg-yellow-400',
};

const saleTypeLegend: Record<number, string> = {
  1: 'Venda Criador',
  2: 'Venda Afiliado',
  3: 'Comissão Paga',
  4: 'Comissão Recebida',
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

  const formatCurrency = (value: number) => {
    const valueAbs = Math.abs(value);
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  
    return formatter.format(valueAbs);
  };

  if (loading) {
    return <div className="text-white">Carregando...</div>;
  }

  if (error) {
    return <div className="text-white">Erro: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Transações</h1>
      <Legend items={saleTypeLegend} colors={SaleTypeColors} />
      <div className="overflow-x-auto ">
        <table className="min-w-full bg-white  ">
          <thead className='text-white bg-black'>
            <tr>
              <th className="py-2 px-4 border-b">Nº</th>
              <th className="py-2 px-4 border-b">Produto</th>
              <th className="py-2 px-4 border-b">Valor</th>
              <th className="py-2 px-4 border-b">Data</th>
              <th className="py-2 px-4 border-b">Vendedor</th>
            </tr>
          </thead>
          <tbody className='text-black'>
            {salesTransactions.map((transaction) => (
              <tr key={transaction.id} className={SaleTypeColors[transaction.sale_type]}>
                <td className="py-2 px-4 border-b text-center">#{transaction.id}</td>
                <td className="py-2 px-4 border-b text-center">{transaction.product}</td>
                <td className="py-2 px-4 border-b text-center">{formatCurrency(transaction.price)}</td>
                <td className="py-2 px-4 border-b text-center">{transaction.purchased_date}</td>
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
          {'<<'}
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleNextPage}
          disabled={!nextPage}
        >
          {'>>'}
        </button>
      </div>
    </div>
    
  );
}

export default SalesTransactionPage;
