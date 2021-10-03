package com.newsequence.api.model;

import javax.persistence.*;

@Entity
@Table(name = "Items")
@SequenceGenerator(name="item_seq")
public class Item {

    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="user_seq")
    @Column(name = "id")
    private Long itemId;

    @Column(name = "item_name")
    private String itemName;

    @Column(name = "item_type")
    public String itemType;

    public Item() {}

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getItemType() {
        return itemType;
    }

    public void setItemType(String itemType) {
        this.itemType = itemType;
    }

    public Long getItemId() {
        return itemId;
    }

}