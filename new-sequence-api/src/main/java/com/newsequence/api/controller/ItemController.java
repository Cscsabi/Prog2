package com.newsequence.api.controller;

import com.newsequence.api.model.Item;
import com.newsequence.api.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

public class ItemController {

    public final ItemService itemService;

    @Autowired
    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping
    public Item getById(@PathVariable(value = "id") Long itemId) {
        return this.itemService.getItem(itemId);
    }
}
