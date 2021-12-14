
export VERSION=1.3.0
export ARCH=$(echo "$(uname -s|tr '[:upper:]' '[:lower:]'|sed 's/mingw64_nt.*/windows/')-$(uname -m | sed 's/x86_64/amd64/g')" | awk '{print tolower($0)}')

echo ${ARCH}-${VERSION}/hyperledger-fabric-${ARCH}-${VERSION}.tar.gz
echo "===> Downloading platform binaries"
if [ ! -d fabric ]; then mkdir fabric; fi
curl https://nexus.hyperledger.org/content/repositories/releases/org/hyperledger/fabric/hyperledger-fabric/${ARCH}-${VERSION}/hyperledger-fabric-${ARCH}-${VERSION}.tar.gz | tar xz -C fabric

#install dep
curl https://raw.githubusercontent.com/golang/dep/master/install.sh | sh 
