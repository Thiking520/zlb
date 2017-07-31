package org.soa.test.activemq.queues;
 
import org.soa.test.activemq.StudentInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.support.JmsUtils;
import org.springframework.stereotype.Component;
 
import javax.jms.Destination;
import javax.jms.JMSException;
import javax.jms.ObjectMessage;
import javax.jms.TextMessage;
 
/**
 * Created by JamesC on 16-9-22.
 */
@Component
public class ConsumeMsg {
    @Autowired
    private JmsTemplate jmsTemplate;
 
    /**
     * 接受消息
     */
    public String receive(Destination destination) {
        TextMessage tm = (TextMessage) jmsTemplate.receive(destination);
        String msg = "";
        try {
            msg = tm.getText();
            System.out.println("从队列" + destination.toString() + "收到了消息：\t" + msg);
 
        } catch (JMSException e) {
            e.printStackTrace();
            return "";
        }
        return msg;
    }
 
    /**
     * 接受消息
     */
    public StudentInfo receiveStudentInfo() {
        try {
            String destination = jmsTemplate.getDefaultDestination().toString();
            ObjectMessage msg=(ObjectMessage)jmsTemplate.receive(destination);
            return (StudentInfo)msg.getObject();
 
        } catch (JMSException e) {
            //检查性异常转换为非检查性异常
            throw JmsUtils.convertJmsAccessException(e);
        }
    }
 
    /**
     * 接受消息
     */
    public Object receiveConvertAndReceive() {
        String destination = jmsTemplate.getDefaultDestination().toString();
        Object msg = jmsTemplate.receiveAndConvert(destination);
        return msg;
    }
}