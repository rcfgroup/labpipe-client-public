![LabPipe Login](labpipe-logo-light.png)

![](../../workflows/Node%20CI/badge.svg)

Client to work with LabPipe Server to assist with data collection:

- **dynamic**: server-side form configuration
- **simple**: wizard style step-by-step guide through forms
- **standalone**: server connection only required at first use*

<sup>*</sup> Server connection is still required if you wish to use functions provided on the server, e.g. notification, backup, and other post upload processes.

## Documentation
The documentation is available [here](https://docs.labpipe.org).

## Quick start
Download latest release [here](../../releases) based on your operating system:

* Windows
    * labpipe-client.Setup.[version].exe
* macOs
    * labpipe-client-[version]-mac.zip
* Linux
    * labpipe-client-[version].AppImage
    * labpipe-client_[version]_amd64.snap

Click and run the binary executable. If this is the first time you run LabPipe Client on your computer, you will be directed to the mandatory settings portal, where you need to setup the following parameters:

* Data Directory
* API Root URL
* API Token
* Server Monitor Interval
* Server Monitor Retry Interval

Details about these parameters can be found [here](https://docs.labpipe.org/client-stable/configuration).

If you wish to try out the client without setting up your own server, you can use the following settings:

| Parameter | Value |
| :--- | :--- |
| API Root URL | `http://try-server.labpipe.org` |
| API Token/Key | `token`/`key` |

> This server is only for test purposes. Please DO NOT use this for production. Data saved on this test server will be removed on a regular basis.

> Although we DO NOT monitor or use any data saved on the test server, please DO NOT disclose any identifiable or confidential information while using this test server.

Otherwise, you can also setup your own server following the [guides](https://docs.labpipe.org/quick-start#labpipe-server).

| Username | Password |
| :--- | :--- |
| `testuser` | `password`|

You can use this test user account to try out different features.

> Although we DO NOT monitor or use any data saved on the test server, if you are going to try out adding a new operator, it is recommended that you use a TEMPORARY email address and FAKE name.

## License
This project is open  under Non-Profit Open Software License 3.0 (NPOSL-3.0).
