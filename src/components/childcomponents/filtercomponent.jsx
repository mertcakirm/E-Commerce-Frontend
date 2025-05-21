const Filtercomponent = () => {
    return (
        <div
            className="offcanvas offcanvas-end offcanvas-sayfa"
            tabIndex="-1"
            id="offcanvasRight1"
            aria-labelledby="offcanvasRightLabel"
        >
            <div className="offcanvas-header">
                <h4>Filtrele</h4>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                ></button>
            </div>
            <div className="offcanvas-body offcanvas-body-filtre">
                <div
                    className="accordion accordion-flush"
                    id="accordionFlushExample"
                >
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseTwo"
                                aria-expanded="false"
                                aria-controls="flush-collapseTwo"
                            >
                                Beden
                            </button>
                        </h2>
                        <div
                            id="flush-collapseTwo"
                            className="accordion-collapse collapse"
                            data-bs-parent="#accordionFlushExample"
                        >
                            <div className="accordion-body">
                                Placeholder content for this accordion, which is
                                intended to demonstrate the{" "}
                                <code>.accordion-flush</code> class. This is the second
                                with some actual content.
                            </div>
                        </div>
                    </div>
                    {/* <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseThree"
                        aria-expanded="false"
                        aria-controls="flush-collapseThree"
                      >
                        Renk
                      </button>
                    </h2>
                    <div
                      id="flush-collapseThree"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        Placeholder content for this accordion, which is
                        intended to demonstrate the{" "}
                        <code>.accordion-flush</code> class. This is the third
                        item's accordion body. Nothing more exciting happening
                        here in terms of content, but just filling up the space
                        to make it look, at least at first glance, a bit more
                        representative of how this would look in a real-world
                        application.
                      </div>
                    </div>
                  </div> */}

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseFive"
                                aria-expanded="false"
                                aria-controls="flush-collapseFive"
                            >
                                Fiyat Aralığı
                            </button>
                        </h2>
                        <div
                            id="flush-collapseFive"
                            className="accordion-collapse collapse"
                            data-bs-parent="#accordionFlushExample"
                        >
                            <div className="accordion-body">
                                Placeholder content for this accordion, which is
                                intended to demonstrate the{" "}
                                <code>.accordion-flush</code> class. This is the third
                                accordion body. Nothing more exciting happening
                                here in terms of content, but just filling up the space
                                to make it look, at least at first glance, a bit more
                                representative of how this would look in a real-world
                                application.
                            </div>
                        </div>
                    </div>
                </div>
                <button className="filtreyi-uygula-btn">Filtreyi Uygula</button>
            </div>
        </div>
    )
}


export default Filtercomponent;