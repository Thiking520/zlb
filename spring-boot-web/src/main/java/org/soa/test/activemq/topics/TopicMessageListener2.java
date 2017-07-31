//TopicMessageListener2
package org.soa.test.activemq.topics;
 
import org.springframework.stereotype.Component;
 
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.TextMessage;
 
/**
 * Created by JamesC on 16-9-22.
 */
@Component
public class TopicMessageListener2 implements MessageListener {
 
    public void onMessage(Message message) {
        TextMessage tm = (TextMessage) message;
        try {
            System.out.println("TopicMessageListener_2 \t" + tm.getText());
        } catch (JMSException e) {
            e.printStackTrace();
        }
    }
}
