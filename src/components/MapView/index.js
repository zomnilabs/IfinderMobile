import React, { Component, PropTypes } from 'react';
import { StyleSheet, Image, ActivityIndicator } from 'react-native';
import RNFS from 'react-native-fs';
import PhotoView from 'react-native-photo-view';

const IMAGE_HOST = 'http://ifinder-api.zomnilabs.com/images/maps/';

export default class MapView extends Component {
    static propTypes = {
        image_map: PropTypes.string.isRequired
    };

    state = {
       isLoading: true
    };

    componentDidMount() {
        const { image_map } = this.props;
        let imageSource = `${IMAGE_HOST}${image_map}`;
        let localSource = `${RNFS.DocumentDirectoryPath}/${image_map}`;

        RNFS.exists(localSource).then((file) => {
            if(! file) {
                let downloadJob = RNFS.downloadFile({
                    fromUrl: imageSource,
                    toFile : localSource
                });

                downloadJob.promise.then((downloadRes) => {
                    if (downloadRes.statusCode === 200) {
                        this.setState({
                            isLoading: false
                        })
                    }
                });

                return;
            }

            this.setState({
                isLoading: false
            });
        });
    }

    render() {
        const { image_map } = this.props;
        let localSource = `${RNFS.DocumentDirectoryPath}/${image_map}`;

        if (this.state.isLoading) {
            return (
                <ActivityIndicator
                    animating={this.state.isLoading}
                    style={[styles.centering, {height: 80}]}
                    size="large" />
            );
        }

        // return (
        //     <Image style={styles.image} source={{ uri: `file://${localSource}` }} />
        // )

        return (
            <PhotoView
                source={{ uri: `file://${localSource}` }}
                minimumZoomScale={1}
                maximumZoomScale={3}
                androidScaleType="fitCenter"
                onLoad={() => console.log("Image loaded!")}
                style={styles.image} />
        )
    }
}

const styles = StyleSheet.create({
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8
    },
    image: {
        flex: 1,
        // resizeMode: 'contain'
    }
});