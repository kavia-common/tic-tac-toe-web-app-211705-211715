#!/bin/bash
cd /home/kavia/workspace/code-generation/tic-tac-toe-web-app-211705-211715/tic_tac_toe_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

