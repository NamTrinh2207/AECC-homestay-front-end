import React from 'react';
import './404.css'

function Page404(props) {
    return (
        <div className={"custom"} >
            <div className="container">
                <div >
                    <h1>:(</h1><br/>
                    <h2><span>Oops...</span> Có vẻ như chúng tôi không tìm thấy trang bạn cần tìm hoặc bạn không có quyền
                        truy cập trang này!!!</h2><br/><br/>
                    <h3><a href="/">Trở về trang chủ</a></h3>
                </div>
            </div>
        </div>
    );
}

export default Page404;