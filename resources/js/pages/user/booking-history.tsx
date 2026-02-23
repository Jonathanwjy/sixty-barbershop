import AppLayout from '@/layouts/app-layout';

export default function BookingHistory() {
    return (
        <>
            <AppLayout>
                <div>
                    <div className="mt-4 w-full px-12 text-center">
                        <h1 className="text-2xl underline underline-offset-8">
                            Booking History
                        </h1>
                        <p>Perjalanan kamu bersama kami</p>
                    </div>

                    <div className="mt-12 grid grid-cols-1 gap-8 px-12 md:grid-cols-2">
                        <div className="group cursor-pointer rounded-lg border bg-accent px-8 py-4 text-accent-foreground transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-transparent hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                            <div className="flex justify-between">
                                <p className="text-2xl font-semibold transition-colors duration-300">
                                    Status
                                </p>
                                <div className="text-right text-sm text-accent-foreground">
                                    <p>date</p>
                                    <p>jam</p>
                                </div>
                            </div>
                            <div className="mt-4 space-y-1">
                                <p className="text-lg font-medium">service</p>
                                <p className="text-muted-foreground">capster</p>
                                <p className="font-semibold text-muted-foreground">
                                    total harga
                                </p>
                            </div>
                        </div>

                        <div className="group cursor-pointer rounded-lg border bg-accent px-8 py-4 text-accent-foreground transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-transparent hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                            <div className="flex justify-between">
                                <p className="text-2xl font-semibold transition-colors duration-300">
                                    Status
                                </p>
                                <div className="text-right text-sm text-accent-foreground">
                                    <p>date</p>
                                    <p>jam</p>
                                </div>
                            </div>
                            <div className="mt-4 space-y-1">
                                <p className="text-lg font-medium">service</p>
                                <p className="text-muted-foreground">capster</p>
                                <p className="font-semibold text-muted-foreground">
                                    total harga
                                </p>
                            </div>
                        </div>
                        <div className="group cursor-pointer rounded-lg border bg-accent px-8 py-4 text-accent-foreground transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-transparent hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                            <div className="flex justify-between">
                                <p className="text-2xl font-semibold transition-colors duration-300">
                                    Status
                                </p>
                                <div className="text-right text-sm text-accent-foreground">
                                    <p>date</p>
                                    <p>jam</p>
                                </div>
                            </div>
                            <div className="mt-4 space-y-1">
                                <p className="text-lg font-medium">service</p>
                                <p className="text-muted-foreground">capster</p>
                                <p className="font-semibold text-muted-foreground">
                                    total harga
                                </p>
                            </div>
                        </div>
                        <div className="group cursor-pointer rounded-lg border bg-accent px-8 py-4 text-accent-foreground transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-transparent hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                            <div className="flex justify-between">
                                <p className="text-2xl font-semibold transition-colors duration-300">
                                    Status
                                </p>
                                <div className="text-right text-sm text-accent-foreground">
                                    <p>date</p>
                                    <p>jam</p>
                                </div>
                            </div>
                            <div className="mt-4 space-y-1">
                                <p className="text-lg font-medium">service</p>
                                <p className="text-muted-foreground">capster</p>
                                <p className="font-semibold text-muted-foreground">
                                    total harga
                                </p>
                            </div>
                        </div>
                        <div className="group cursor-pointer rounded-lg border bg-accent px-8 py-4 text-accent-foreground transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-transparent hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                            <div className="flex justify-between">
                                <p className="text-2xl font-semibold transition-colors duration-300">
                                    Status
                                </p>
                                <div className="text-right text-sm text-accent-foreground">
                                    <p>date</p>
                                    <p>jam</p>
                                </div>
                            </div>
                            <div className="mt-4 space-y-1">
                                <p className="text-lg font-medium">service</p>
                                <p className="text-muted-foreground">capster</p>
                                <p className="font-semibold text-muted-foreground">
                                    total harga
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </AppLayout>
        </>
    );
}
