package vttp.iss.backend.models;

public class ChatRecord {
    
    private int chatId;

    private String user;

    private String merchant;

    public ChatRecord() {
    }

    public ChatRecord(String user, String merchant) {
        this.user = user;
        this.merchant = merchant;
    }

    public ChatRecord(int chatId, String user, String merchant) {
        this.chatId = chatId;
        this.user = user;
        this.merchant = merchant;
    }

    public int getChatId() {
        return chatId;
    }

    public void setChatId(int chatId) {
        this.chatId = chatId;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getMerchant() {
        return merchant;
    }

    public void setMerchant(String merchant) {
        this.merchant = merchant;
    }

    @Override
    public String toString() {
        return "ChatRecord [chatId=" + chatId + ", user=" + user + ", merchant=" + merchant + "]";
    }
}
