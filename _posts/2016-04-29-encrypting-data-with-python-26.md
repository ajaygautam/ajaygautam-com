---
layout: post
title: "Encrypting data with Python 2.6"
description: "Encrypting data with Python 2.6"
category: Python
tags: [python,encryption]
comments: true
---
{% include JB/setup %}

Turns out [simple_crypt](https://pypi.python.org/pypi/simple-crypt) does not support 2.6, so I wrote a simplistic version myself (with parts copied from various sources). Enjoy:

Helper class to encrypt / decrypt:

```python
from Crypto.Cipher import AES

BS = 16

class EncryptionService(object):
    def __init__(self, key):
        if len(key) > 31:
            raise Exception("key needs to be less than 31 bytes. Found %d" % len(key))
        self.key = self.pad(key)
        self.iv_str = self.pad("Any iv string")
        self.encryption_suite = AES.new(self.key, AES.MODE_CBC, self.iv_str)

    def encrypt(self, encrypt_this):
        padded = self.pad(encrypt_this)
        encrypted = self.encryption_suite.encrypt(padded)
        return encrypted

    def decrypt(self, decrypt_this):
        decrypted = self.encryption_suite.decrypt(decrypt_this)
        unpadded = self.unpad(decrypted)
        return unpadded

    @staticmethod
    def unpad(s):
        return s[:-ord(s[len(s) - 1:])]

    @staticmethod
    def pad(s):
        return s + (BS - len(s) % BS) * chr(BS - len(s) % BS)
```

Using:

```python
import unittest

from common.encryption.encryption_service import EncryptionService

class EncryptionServiceTest(unittest.TestCase):
    def test_encryption(self):
        test_key = "salad is good for you"
        test_password = "pizza is better"

        service = EncryptionService(test_key)
        encrypted_data = service.encrypt(test_password)
        self.assertNotEquals(test_password, encrypted_data)

        service = EncryptionService(test_key)
        decrypted_data = service.decrypt(encrypted_data)
        self.assertEquals(decrypted_data, test_password)
```

Hope it helps. (I am sure you can figure out which packages / eggs you need to install)

Disclaimer: suitability of this code to your needs is not guaranteed. You use this on your own risk.
