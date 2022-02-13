//引入express
const express = require('express');
//引入nodemailer
const nodemailer = require('nodemailer');

//使用express的路由
const router = express.Router();
//解析json请求体数据
router.use(express.json());
//解析url-encoded请求体数据
router.use(express.urlencoded({
    extended: false
}))
// 创建发送对象
let transpoter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    secureConnection: true,
    port: 465,
    secure: true,
    auth: {
        user: '2873524239@qq.com',
        pass: 'eujucczasqhadhci',
    }
});
//post接口
router.post('/getcode', (req, res) => {
    //设置响应头，cors跨域问题
    
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    //随机生成一个六位数的验证码
    let code = Math.floor(Math.random() * 899999 + 100000);
    console.log(req.query.email);
    //邮件内容
    let mailOptions = {
        from: '2873524239@qq.com',
        to: `2876053639@qq.com,${req.query.email}`,
        subject: 'todoList验证码',
        text: `
        您的验证码是：${code}
        `
    }
    //判断邮件发送状态
    transpoter.sendMail(mailOptions, (err, info) => {
        if (err) {
            res.send('邮件发送失败');
        } else {
            res.send({content:"邮件已发送",code:code});
        }
    })
});

module.exports = router;