import * as React from 'react';
import Dynamsoft from 'dwt';
import './dwt.css'
import { WebTwain } from 'dwt/dist/types/WebTwain';

export interface IDwtState {
    scanners: any,
    currentScanner: any
}

export type ScannerProps = {
    beginScan?: () => void,
    endScan?: () => void,
    setCurrentScanner?: (scanner: any) => void,
    getAvailableScanners: (scanners: any[]) => void,
    emitNewPage: (images: any) => void,
    hideDisplay: boolean;
}

export default class DWT extends React.Component<ScannerProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            scanners: [],
            currentScanner: "Looking for devices..",
            imageIndex: 0
        };
    }

    DWObject: any = null;
    containerId = 'dwtcontrolContainer';
    width = this.props.hideDisplay ? '0px' : "100%";
    height = this.props.hideDisplay ? '0px' : "600";

    componentDidMount() {
        Dynamsoft.DWT.RegisterEvent('OnWebTwainReady', () => {
            this.DWObject = Dynamsoft.DWT.GetWebTwain(this.containerId);
            if (this.DWObject) {
                let vCount = this.DWObject.SourceCount;
                let sourceNames = [];
                for (let i = 0; i < vCount; i++)
                    sourceNames.push(this.DWObject.GetSourceNameItems(i));
                this.setState({ scanners: sourceNames });
                this.props.getAvailableScanners(sourceNames);
            }
            this.registerTransferAsyncEvent();

        });
        this.loadDWT();
    }

    private registerTransferAsyncEvent() {
        (this.DWObject as WebTwain).RegisterEvent('OnPostTransferAsync',
            (outputInfo) => {
                console.log("An image has been scanned", outputInfo);
                const lastScannedIndex = (this.DWObject as WebTwain).CurrentImageIndexInBuffer;
                (this.DWObject as WebTwain).CopyToClipboard(lastScannedIndex);
                this.setState({ imageIndex: this.state.imageIndex + 1 });

                (this.DWObject as WebTwain).SelectedImagesCount = 1;
                (this.DWObject as WebTwain).SelectImages([lastScannedIndex]);
                (this.DWObject as WebTwain).GetSelectedImagesSize(1);
                const pageData = (this.DWObject as WebTwain).SaveSelectedImagesToBase64Binary();
                this.props.emitNewPage(pageData);
            }
        );
    }

    private loadDWT() {
        Dynamsoft.DWT.ResourcesPath = "dwt-resources";
        Dynamsoft.DWT.ProductKey = 'Your-api-key';
        Dynamsoft.DWT.Containers = [{ ContainerId: this.containerId, Width: this.width, Height: this.height, WebTwainId: "DWT1" }];
        let checkScriptLoaded = () => {
            if (Dynamsoft.Lib.detect.scriptLoaded) {
                this.modulizeInstallJS();
                Dynamsoft.DWT.Load();
            } else {
                setTimeout(() => {
                    checkScriptLoaded();
                }, 1000);
            }
        };
        checkScriptLoaded();
    }

    private onSourceChange(value: any) {
        this.setState({ currentScanner: value });
    }

    acquireImage() {
        this.DWObject.CloseSource();
        for (let i = 0; i < this.DWObject.SourceCount; i++) {
            if (this.DWObject.GetSourceNameItems(i) === this.state.currentScanner) {
                this.DWObject.SelectSourceByIndex(i);
                break;
            }
        }
        this.DWObject.OpenSource();
        (this.DWObject as WebTwain).AcquireImage();
    }

    loadImagesOrPDFs() {
        this.DWObject.IfShowFileDialog = true;
        this.DWObject.Addon.PDF.SetResolution(200);
        this.DWObject.Addon.PDF.SetConvertMode(1/*Dynamsoft.DWT.EnumDWT_ConvertMode.CM_RENDERALL*/);
        (this.DWObject as WebTwain).LoadImageEx("", 5 /*Dynamsoft.DWT.EnumDWT_ImageType.IT_ALL*/,
            () => { },
            (errorCode: any, errorString: any) => alert(errorString));
    }

    render() {
        return (
            <div style={{ display: this.props.hideDisplay ? 'none' : 'inline-block', width: "30%", margin: "0 auto" }}>
                <select style={{ width: "100%" }} tabIndex={1} value={this.state.currentScanner} onChange={(e) => this.onSourceChange(e.target.value)}>
                    {
                        this.state.scanners.length > 0 ?
                            this.state.scanners.map((_name: any, _index: any) =>
                                <option value={_name} key={_index}>{_name}</option>
                            )
                            :
                            <option value="Looking for devices..">Looking for devices..</option>
                    }
                </select>
                <button tabIndex={2} style={{ marginRight: "4%", width: "48%" }}
                    onClick={() => this.acquireImage()}
                    disabled={this.state.scanners.length > 0 ? false : true}>Scan</button>
                <button tabIndex={3} style={{ margin: "2% 0", width: "48%" }}
                    onClick={() => this.loadImagesOrPDFs()}
                >Load</button>
                <div id={this.containerId}></div>
            </div >
        );
    }

    private modulizeInstallJS() {
        // let _DWT_Reconnect = Dynamsoft.;
        // Dynamsoft.DWT_Reconnect = (...args) => _DWT_Reconnect.call({ Dynamsoft: Dynamsoft }, ...args);
        // let __show_install_dialog = Dynamsoft._show_install_dialog;
        // Dynamsoft._show_install_dialog = (...args) => __show_install_dialog.call({ Dynamsoft: Dynamsoft }, ...args);
        // let _OnWebTwainOldPluginNotAllowedCallback = Dynamsoft.OnWebTwainOldPluginNotAllowedCallback;
        // Dynamsoft.OnWebTwainOldPluginNotAllowedCallback = (...args) => _OnWebTwainOldPluginNotAllowedCallback.call({ Dynamsoft: Dynamsoft }, ...args);
        // let _OnWebTwainNeedUpgradeCallback = Dynamsoft.OnWebTwainNeedUpgradeCallback;
        // Dynamsoft.OnWebTwainNeedUpgradeCallback = (...args) => _OnWebTwainNeedUpgradeCallback.call({ Dynamsoft: Dynamsoft }, ...args);
        // let _OnWebTwainPreExecuteCallback = Dynamsoft.OnWebTwainPreExecuteCallback;
        // Dynamsoft.OnWebTwainPreExecuteCallback = (...args) => _OnWebTwainPreExecuteCallback.call({ Dynamsoft: Dynamsoft }, ...args);
        // let _OnWebTwainPostExecuteCallback = Dynamsoft.OnWebTwainPostExecuteCallback;
        // Dynamsoft.OnWebTwainPostExecuteCallback = (...args) => _OnWebTwainPostExecuteCallback.call({ Dynamsoft: Dynamsoft }, ...args);
        // let _OnRemoteWebTwainNotFoundCallback = Dynamsoft.OnRemoteWebTwainNotFoundCallback;
        // Dynamsoft.OnRemoteWebTwainNotFoundCallback = (...args) => _OnRemoteWebTwainNotFoundCallback.call({ Dynamsoft: Dynamsoft }, ...args);
        // let _OnRemoteWebTwainNeedUpgradeCallback = Dynamsoft.OnRemoteWebTwainNeedUpgradeCallback;
        // Dynamsoft.OnRemoteWebTwainNeedUpgradeCallback = (...args) => _OnRemoteWebTwainNeedUpgradeCallback.call({ Dynamsoft: Dynamsoft }, ...args);
        // let _OnWebTWAINDllDownloadFailure = Dynamsoft.OnWebTWAINDllDownloadFailure;
        // Dynamsoft.OnWebTWAINDllDownloadFailure = (...args) => _OnWebTWAINDllDownloadFailure.call({ Dynamsoft: Dynamsoft }, ...args);
    }
}



