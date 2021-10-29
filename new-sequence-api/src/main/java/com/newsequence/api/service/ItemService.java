package com.newsequence.api.service;

import com.newsequence.api.model.Item;
import org.jvnet.hk2.annotations.Service;

@Service
public interface ItemService {

    //Item createItem(Item item);

    Item getItem(Long id);

    //Item showItem();
}
