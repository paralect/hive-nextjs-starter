import { useState, useEffect } from 'react';
import { ApiResult } from '@/lib/api';

export default function useTable<TData>({
  queryFn
}) {
  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(null);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });

  const [searchQuery, setSearchQuery] = useState('');

  const reloadData = async () => {
    try {
      setIsFetching(true);
      const results: ApiResult<TData> = await queryFn();
      setData(results);
    } finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    reloadData();
  }, [pagination.pageIndex, pagination.pageSize]);


  const itemsCrud = {
    unshiftItem: (item) => {
      setData({
        ...data,
        results: [item, ...data.results]
      })
    },

    pushItem: (item) => {
      setData({
        ...data,
        results: [...data.results, item]
      })
    },

    updateItem: (item) => {
      setData({
        ...data,
        results: (data.results || []).map(i => {
          if (i._id === item._id) {
            i = item;
          }

          return i;
        })
      })
    },


    removeItem: (item) => {
      setData({
        ...data,
        results: (data.results || []).filter(i => {
          return (i._id !== item._id);
        })
      })
    }
  }

  return {
    data, setData,
    reloadData,

    pagination, setPagination,
    searchQuery, setSearchQuery,

    isFetching,
    setIsFetching,

    ...itemsCrud,
  }
}
