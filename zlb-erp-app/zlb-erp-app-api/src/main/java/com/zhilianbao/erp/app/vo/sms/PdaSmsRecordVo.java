package com.zhilianbao.erp.app.vo.sms;

import java.io.Serializable;

public class PdaSmsRecordVo implements Serializable{

    private static final long serialVersionUID = -8098769369544584724L;
    private String smsCode;//短信编码
    private String smsContent;//短信内容
    private String templateCode;//模板编码
    private String templateTheme;//模板主题
    private String templateContent;//模版短信内容
    private String receivePersons;//接收人数
    private String sendStatus;//短信编码下的短信发送状态 0 失败 1 成功 2 发送中 3 部分成功

    public String getSmsCode() {
        return smsCode;
    }

    public void setSmsCode(String smsCode) {
        this.smsCode = smsCode;
    }

    public String getTemplateCode() {
        return templateCode;
    }

    public void setTemplateCode(String templateCode) {
        this.templateCode = templateCode;
    }

    public String getTemplateTheme() {
        return templateTheme;
    }

    public void setTemplateTheme(String templateTheme) {
        this.templateTheme = templateTheme;
    }

    public String getSmsContent() {
        return smsContent;
    }

    public void setSmsContent(String smsContent) {
        this.smsContent = smsContent;
    }

    public String getReceivePersons() {
        return receivePersons;
    }

    public void setReceivePersons(String receivePersons) {
        this.receivePersons = receivePersons;
    }

    public String getSendStatus() {
        return sendStatus;
    }

    public void setSendStatus(String sendStatus) {
        this.sendStatus = sendStatus;
    }

    public String getTemplateContent() {
        return templateContent;
    }

    public void setTemplateContent(String templateContent) {
        this.templateContent = templateContent;
    }
}