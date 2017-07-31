package org.soa.test.activemq.listeners;
 
 
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.TextMessage;
 
/**
 * Created by JamesC on 16-9-22.
 */
public class StudentInfoHandler implements MessageListener {
	////加载spring配置后，studentInfoHandler的onMessage方法自动运行并接收队列
	public void onMessage(Message message) {
		 TextMessage tm = (TextMessage) message;
        try {
            System.out.println("ConsumerMessageListener收到了文本消息：\t"+ tm.getText());
        } catch (JMSException e) {
            e.printStackTrace();
        }
	}
 
}