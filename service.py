#!/usr/bin/env python
# -*- coding:utf-8 -*-

import json
import asyncio
import websockets

connected = set()

async def hello(websocket, path):
    connected.add(websocket)
    try:
        async for message in websocket:
            await asyncio.wait([user.send(message) for user in connected])
    finally:
        connected.remove(websocket)

if __name__ == '__main__':
    start_server = websockets.serve(hello, '0.0.0.0', 9090)
    loop = asyncio.get_event_loop()
    loop.run_until_complete(start_server)
    loop.run_forever()
