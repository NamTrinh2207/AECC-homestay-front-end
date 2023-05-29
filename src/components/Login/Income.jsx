import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import {Pagination} from 'antd';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const labels = [
    'Tháng 01',
    'Tháng 02',
    'Tháng 03',
    'Tháng 04',
    'Tháng 05',
    'Tháng 06',
    'Tháng 07',
    'Tháng 08',
    'Tháng 09',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
];

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Biểu đồ thống kê',
        },
    },
    elements: {
        line: {
            borderWidth: 2,
            tension: 0,
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
            },
        },
        y: {
            grid: {
                display: true,
            },
        },
    },
};

export function Income(props) {
    const [income, setIncome] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 7;

    useEffect(() => {
        axios
            .get(`http://localhost:8080/homes/users/${props.user.id}/income`)
            .then((response) => {
                setIncome(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const generateDataArray = (income, name) => {
        const dataArray = new Array(12).fill(null);

        income.forEach((item) => {
            if (item.name === name) {
                const monthIndex = new Date(item.month).getMonth();
                dataArray[monthIndex] = item.income;
            }
        });
        return dataArray;
    };

    const names = [...new Set(income.map((item) => item.name))];
    const totalItems = income.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalItems);
    const paginatedIncome = income.slice(startIndex, endIndex);

    const colorPalette = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

    const chartData = {
        labels: labels,
        datasets: names.map((name, index) => ({
            label: name,
            data: generateDataArray(income, name),
            borderColor: colorPalette[index % colorPalette.length],
            backgroundColor: 'rgba(0,0,0,0)',
            spanGaps: true,
        })),
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const [nameFilter, setNameFilter] = useState("");
    const [monthFilter, setMonthFilter] = useState("");

    const handleNameFilter = (event) => {
        const name = event.target.value;
        setNameFilter(name);
    };

    const handleMonthFilter = (event) => {
        const month = event.target.value;
        setMonthFilter(month);
    };

    const filteredIncome = paginatedIncome.filter((item) => {
        const nameMatch = item.name.toLowerCase().includes(nameFilter.toLowerCase());
        const monthMatch = item.month.toLowerCase().includes(monthFilter.toLowerCase());
        return nameMatch && monthMatch;
    });

    const filteredTotalIncome = filteredIncome.reduce(
        (total, item) => total + item.income,
        0
    );
    return (
        <div className="container">
            <div className="chart-container">
                <Line options={options} data={chartData}/>
            </div>
            <table className="table mt-5" style={{borderCollapse: 'collapse', width: '100%'}}>
                <thead>
                <tr>
                    <th scope="col" style={{
                        borderBottom: '1px solid #000',
                        padding: '8px',
                        textAlign: 'center',
                        backgroundColor: "#36A2EB"
                    }}>
                        Tên Homestay
                    </th>
                    <th scope="col" style={{
                        borderBottom: '1px solid #000',
                        padding: '8px',
                        textAlign: 'center',
                        backgroundColor: "#36A2EB"
                    }}>
                        Tháng
                    </th>
                    <th scope="col" style={{
                        borderBottom: '1px solid #000',
                        padding: '8px',
                        textAlign: 'center',
                        backgroundColor: "#36A2EB"
                    }}>Tổng thu nhập
                    </th>
                </tr>
                <tr>
                    <th style={{display: 'flex', justifyContent: 'center'}}>
                        <input
                            placeholder="Lọc theo tên"
                            style={{width: 200, height: 30, textAlign: 'center'}}
                            type="text"
                            onChange={handleNameFilter}
                        />
                    </th>
                    <th style={{justifyContent: 'center'}}>
                        <input
                            placeholder="Lọc theo tháng"
                            style={{width: 130, height: 30, textAlign: 'center',marginLeft:40}}
                            type="text"
                            onChange={handleMonthFilter}
                        />
                    </th>

                    <th></th>
                </tr>
                </thead>
                <tbody>
                {filteredIncome.map((item, index) => (
                    <tr key={index}>
                        <td style={{padding: '8px', textAlign: 'center'}}>{item.name}</td>
                        <td style={{padding: '8px', textAlign: 'center'}}>{item.month}</td>
                        <td style={{padding: '8px', textAlign: 'center'}}>
                            {item.income >= 1000000 ? item.income.toLocaleString() : item.income} VNĐ
                        </td>
                    </tr>
                ))}
                <tr>
                    <td style={{padding: '8px', textAlign: 'left', fontWeight: 'bold'}}>Tổng tất cả thu nhập:</td>
                    <td style={{padding: '8px', textAlign: 'center'}}></td>
                    <td style={{padding: '8px', textAlign: 'center', fontWeight: 'bold'}}>
                        {filteredTotalIncome >= 1000000 ? filteredTotalIncome.toLocaleString() : filteredTotalIncome} VNĐ
                    </td>
                </tr>
                </tbody>
            </table>
            <Pagination
                current={currentPage}
                total={totalItems}
                pageSize={pageSize}
                onChange={handlePageChange}
            />
        </div>
    );
}

export default Income;
